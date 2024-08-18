import ProductCard from "@/app/components/ProductCard";
import { GetCategory } from "@/app/lib/CategoryGet";
import { unstable_noStore as noStore } from "next/cache";

const Category = async ({ params }: { params: { category: string } }) => {
  noStore()
  const data = await GetCategory(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1   lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data && data.length > 0 ? (
          data.map((product) => (
            <ProductCard
              key={product.id}
              images={product.images}
              name={product.name}
              price={product.price}
              shortDescription={product.shortDescription}
              id={product.id}
            />
          ))
        ) : (
          <div className="py-6 mt-6 flex items-center justify-center col-span-3  mb-24 px-4 lg:px-8  ">
            <h1 className="text-center  text-2xl font-semibold">
              No Products available for <br />
              <span className="text-primary capitalize">{params.category}</span>
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;

