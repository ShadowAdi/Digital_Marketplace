import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "../lib/db";
import { Button } from "@/components/ui/button";
import { CreateStripeAccountLink, GetDashboardLink } from "../actions/stripe.action";
import SubmitButton from "../components/SubmitButton";
import { unstable_noStore } from "next/cache";
async function getData(id: string) {
  unstable_noStore()
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });
  return data;
}

const Billing = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const data = await getData(user.id);

  return (
    <section className="max-w-7xl md:px-8 px-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Find all your details regarding your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectedLinked === false && (
            <form action={CreateStripeAccountLink}>
              <SubmitButton title="Link your account to Stripe" />
            </form>
          )}
          {data?.stripeConnectedLinked === true && (
            <form action={GetDashboardLink}>
              <SubmitButton title="View Dashboard" />
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Billing;
