import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  shortDescription: string;
  id: string;
}

const ProductCard = ({
  images,
  id,
  price,
  shortDescription,
  name,
}: iAppProps) => {
  return (
    <div className="rounded-lg  cursor-pointer pb-3  shadow hover:shadow-md">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative h-[230px]">
                  <Image
                    src={image}
                    alt="Product"
                    fill
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex mx-2 justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>
      <p className="text-gray-600 mx-2 line-clamp-2 text-sm mt-2">
        {shortDescription}
      </p>
      <Button asChild className=" mt-5 w-[94%] mx-2">
        <Link href={"/product/" + id}>See More!</Link>
      </Button>
    </div>
  );
};

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2 ">
        <Skeleton className="w-full h-4 " />
        <Skeleton className="w-full h-6 " />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}

export default ProductCard;
