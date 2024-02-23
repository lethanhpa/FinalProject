import React, { memo } from "react";
import HomePage from "./home/index";
import MoveTop from "@/components/App/AppMoveTop";
import axiosClient from "@/libraries/axiosClient";

function Home({ products }) {
  return (
    <main className="container">
      <HomePage
        products={products}
      />
      <MoveTop />
    </main>
  );
};

export default memo(Home);

export async function getServerSideProps() {
  console.log('aaabbbbbbbbcccccc');
  const responseProduct = await axiosClient.get("/products");
  const products = responseProduct.data;
  console.log('products',products);
  return {
    props: {
      products,
    },
  };
}