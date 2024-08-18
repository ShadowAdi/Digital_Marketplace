import React from "react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import SelfForm from "../components/forms/SelfForm";
import { unstable_noStore as noStore } from "next/cache";
import { GetSellData } from "../lib/CategoryGet";

const Sell = async () => {
  noStore();

  const { isAuthenticated, getUser } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  const user = await getUser();
  if (!isAuth) {
    redirect("/");
  }

  const _ = await GetSellData(user?.id as string);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
      <Card>
        <SelfForm />
      </Card>
    </section>
  );
};

export default Sell;
