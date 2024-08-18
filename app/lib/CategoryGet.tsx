import { CategoryTypes } from "@prisma/client";
import prisma from "./db";
import { notFound, redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export async function GetCategory(category: string) {
  noStore();
  let input;
  switch (category) {
    case "template":
      input = "template";
      break;
    case "uikit":
      input = "uikit";
      break;
    case "icon":
      input = "icon";
      break;
    case "all":
      input = undefined;
      break;
    default:
      return notFound();
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      name: true,
      price: true,
      shortDescription: true,
    },
  });
  return data;
}

export async function GetSellData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }

  return null;
}
