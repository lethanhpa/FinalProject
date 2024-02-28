import React, { memo } from "react";
import { API_URL } from "@/constants";

import axiosClient from "@/libraries/axiosClient";

function ProductDetails({ product }) {
  console.log('product', product);
  return (
    <div className="container"  key={product.id}>
      <div>
        <img src={`${API_URL}/${product.imageUrl}`} alt={`slide-${product.id}`} className="hover:-translate-y-1 hover:scale-105  duration-300 text-clip  sm:block flex items-center w-[27rem] object-contain" style={{
          background:
            "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
        }} />
        <p>{product.productName}</p>
        <p>{product.sizeId}</p>
        {
          product.size.sizes && product.size.sizes.map(
            (item) => {
              return (
                <p>{item.size}</p>
              )
            }
          )
        }
      </div>
    </div >
  )
}

export default memo(ProductDetails);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/${params.id}`);
    console.log("response", response.data)
    return {
      props: {
        product: response.data.result,
      },
      revalidate: 10,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("err", error);
    return {
      notFound: true,
    };
  }
}
