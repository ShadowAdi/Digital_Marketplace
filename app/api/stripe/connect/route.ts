import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
    );
    console.log("Event constructed:", event);
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    return new Response("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;
      console.log("Account updated:", account);

      try {
        const data = await prisma.user.update({
          where: {
            connectedAccountId: account.id,
          },
          data: {
            stripeConnectedLinked:
              account.capabilities?.transfers === "pending" ||
              account.capabilities?.transfers === "inactive"
                ? false
                : true,
          },
        });
        console.log("Database updated:", data);
      } catch (error: unknown) {
        console.error("Database error:", error);
      }
      break;
    }
    default: {
      console.log("Unhandled event:", event.type);
    }
  }

  return new Response(null, { status: 200 });
}