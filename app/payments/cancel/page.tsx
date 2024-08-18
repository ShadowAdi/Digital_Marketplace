import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cancel = () => {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center ">
            <XCircle className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Cancelled</h3>
            <p className="text-sm text-muted-foreground mt-2">
                Something Went Wrong  with your payment . You have not been Charged. Please Try Again
            </p>
            <Button className="mt-5 sm:mt-6 w-full cursor-pointer" asChild>
                <Link href={"/"}>
                Back to Home
                </Link>

            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Cancel;
