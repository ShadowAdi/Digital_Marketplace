"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit">{title}</Button>
      )}
    </>
  );
};

export const BuyButton = ({ price }: { price: number }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full mt-10" disabled size={"lg"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <>
          <Button className="w-full mt-10" size={"lg"}>
            Buy for ${price}
          </Button>
        </>
      )}
    </>
  );
};

export default SubmitButton;
