import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "../lib/db";
import SettingsForm from "../components/forms/settingsForm";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userID: string) {
  noStore()

  const data = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

const Settings = async () => {
  noStore()

  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isAuth =await isAuthenticated();

  if (!isAuth) {
    redirect("/");
  }
  const data = await getData(user?.id as string);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          email={data?.email as string}
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
        />
      </Card>
    </section>
  );
};

export default Settings;
