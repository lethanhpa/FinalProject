import React, { memo } from "react";
import HomePage from "./home/index";
import MoveTop from "@/components/App/AppMoveTop";

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
  const responseProduct = await fetch("https://fakestoreapi.com/products");
  const products = await responseProduct.json();
  console.log('products',products);
  return {
    props: {
      products,
    },
  };
}