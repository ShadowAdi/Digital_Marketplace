import ProductDescription from "@/app/components/ProductDescription";
import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { type JSONContent } from "@tiptap/react";
import { BuyProduct } from "@/app/actions/stripe.action";
import { BuyButton } from "@/app/components/SubmitButton";
import { unstable_noStore as noStore } from "next/cache";

// This function is now private and not exported
async function getData(id: string) {
  noStore()

  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      description: true,
      shortDescription: true,
      images: true,
      name: true,
      userId: true,
      createdAt: true,
      id: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
      price: true,
      productFile: true,
    },
  });
  return data;
}

const ProductSingle = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  return (
    <section className="max-w-7xl mb-24 mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Carousel className="lg:row-end-1 lg:col-span-4 ">
        <CarouselContent>
          {data?.images?.map((image, i) => (
            <CarouselItem key={i}>
              <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden rounded-lg">
                <Image
                  src={image as string}
                  alt="No Image"
                  fill
                  className="object-cover h-full w-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:row-span-2 lg:mt-0 lg:row-end-2  lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.shortDescription}</p>
        <form action={BuyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={data?.price as number} />
        </form>
      
        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground col-span-1">
              Released:{" "}
            </h3>
            <h3 className="text-xs font-semibold  col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>
            <h3 className="text-sm font-semibold text-muted-foreground col-span-1 ">
              Category:
            </h3>
            <h3 className="text-sm font-semibold col-span-1 ">
              {data?.category}
            </h3>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-10"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <p>
          <ProductDescription content={data?.description as JSONContent} />
        </p>
      </div>
    </section>
  );
};

export default ProductSingle;
