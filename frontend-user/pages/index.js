import React, { memo } from "react";
import HomePage from "./home/index";
import axiosClient from "@/libraries/axiosClient";
import FacebookMsg from "@/components/Facebook/FacebookMsg"
import { BackTop } from "antd";

function Home({ products, reviews }) {
  return (
    <main className="container">
      <HomePage
        products={products}
        reviews={reviews}
      />
      <FacebookMsg />
      <BackTop />
    </main>
  );
};

export default memo(Home);

export async function getServerSideProps() {
  // const responseProduct = await axiosClient.get("/products");
  // const products = responseProduct.data;
  // return {
  //   props: {
  //     products,
  //   },
  // };
  try {
    const [productsResponse, categoriesResponse, reviewsResponse] =
      await Promise.all([
        axiosClient.get("/products"),
        axiosClient.get("/categories"),
        axiosClient.get("/reviews"), // Assuming this endpoint fetches all reviews
      ]);

    return {
      props: {
        products: productsResponse.data,
        categories: categoriesResponse.data,
        reviews: reviewsResponse.data, // Pass reviews data as props
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
