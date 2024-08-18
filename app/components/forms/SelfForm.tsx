"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import SelectCategory from "@/app/components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { UploadDropzone } from "@/app/lib/uploadThing";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "@/app/actions/action";
import { toast } from "sonner";
import SubmitButton from "@/app/components/SubmitButton";
import { redirect } from "next/navigation";

const SelfForm = () => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, SetProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell Your prouct with ease</CardTitle>
        <CardDescription>
          Please... Describe Your Product in Detail so it can easily sold
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Name of your product"
            required
            minLength={5}
          />
          {state?.errors?.["name"]?.[0] && (
            <p className="text-red-500">{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Category</Label>
          <SelectCategory />
          {state?.errors?.["category"]?.[0] && (
            <p className="text-red-500">{state?.errors?.["category"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Price</Label>
          <Input
            required
            min={1}
            name="price"
            placeholder="29$"
            type="number"
          />
          {state?.errors?.["price"]?.[0] && (
            <p className="text-red-500">{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Small Summary</Label>
          <Textarea
            name="smallDescription"
            placeholder="Pleae describe your product shortly right here..."
            required
            minLength={10}
          />
          {state?.errors?.["smallDescription"]?.[0] && (
            <p className="text-red-500">
              {state?.errors?.["smallDescription"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          />
          <Label>Description</Label>
          <TipTapEditor json={json} setJson={setJson} />
          {state?.errors?.["description"]?.[0] && (
            <p className="text-red-500">
              {state?.errors?.["description"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res?.map((item) => item.url));
              toast.success("Your Images has been uploaded");
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong. Try again!!!");
            }}
          />
          {state?.errors?.["images"]?.[0] && (
            <p className="text-red-500">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="productFile" value={productFile ?? ""} />
          <Label>Product File</Label>
          <UploadDropzone
            onClientUploadComplete={(res) => {
              SetProductFile(res[0].url);
              toast.success("Your Files have been uploaded");
            }}
            endpoint="productFileUpload"
            onUploadError={(error: Error) => {
              toast.error("Something went wrong. Try again!!!");
            }}
          />
          {state?.errors?.["productFile"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["productFile"]?.[0]}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton title="Submit" />
      </CardFooter>
    </form>
  );
};

export default SelfForm;
