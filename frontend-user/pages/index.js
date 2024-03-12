import React, { memo } from "react";
import HomePage from "./home/index";
import axiosClient from "@/libraries/axiosClient";
import FacebookMsg from "@/components/Facebook/FacebookMsg"
import { FloatButton } from "antd";

function Home({ products }) {
  return (
    <main className="container">
      <HomePage
        products={products}
      />
      <FacebookMsg/>
      <FloatButton.BackTop />
    </main>
  );
};

export default memo(Home);

export async function getServerSideProps() {
  const responseProduct = await axiosClient.get("/products");
  const products = responseProduct.data;
  return {
    props: {
      products,
    },
  };
}