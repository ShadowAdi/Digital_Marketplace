import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import ProductCard from "../components/ProductCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore()
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      images: true,
      price: true,
      shortDescription: true,
      id: true,
    },
  });

  return data;
}
const MyProducts = async () => {
  noStore()
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  const data = await getData(user?.id as string);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 ">
      <h1 className="text-2xl font-bold">My Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
        {data?.map((item, i) => {
          return (
            <ProductCard
              key={i}
              id={item.id}
              name={item.name}
              images={item.images}
              price={item.price}
              shortDescription={item.shortDescription}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyProducts;
