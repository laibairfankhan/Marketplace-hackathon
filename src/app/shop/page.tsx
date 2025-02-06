"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Product } from '../../../types/products';
import { allProducts } from "@/sanity/lib/queries";  // Removed 'four' import
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import Header from "../components/header";
import ShopLine from "../components/shop";
import Field from "../components/Feild";
import Page from "../components/Ourpage";

const Shop = () => {
  const [products, setProducts] = useState<Product[] | null>(null); // Initial state null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Loading state false after fetching
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
      {/* Header Section */}
      <div className="bg-[#faf4f4]">
        <Header />
      </div>

      {/* Banner Section */}
      <div className="relative text-black">
        <Image
          src="/shop.jpeg"
          alt="Shop Banner"
          height={400}
          width={1600}
          className="w-full h-40 md:h-auto object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl font-semibold">
          Shop
        </h1>

        {/* Breadcrumbs */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
          <p className="text-gray-700 text-xs md:text-xl flex items-center">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="font-bold mx-2">{'>'}</span>
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
          </p>
        </div>
      </div>

      {/* ShopLine Component */}
      <div className="my-6">
        <ShopLine />
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md">
              {product.image && (
                <Image
                  src={urlFor(product.image).url()} // Use product.image here
                  alt={product.name} // Display the product name as alt text
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-700 text-md font-medium">Rs. {product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="justify-center mx-auto mt-8">
        <Page />
      </div>

      {/* Footer Section */}
      <Field />
    </div>
  );
};

export default Shop;


