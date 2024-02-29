import router from "next/router";
import React, { useState, memo, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button, Divider } from "antd";
import numeral from "numeral";
import Link from "next/link";
import axiosClient from "@/libraries/axiosClient";
import { API_URL } from "@/constants";

function Products({ products, categories }) {
  const [visibleProducts, setVisibleProducts] = useState(4);
  const totalProducts = products.length;

  const handleAddCart = (productId) => {
    addToCart(productId);
  };

  const handleShowMore = () => {
    const newVisibleProducts = visibleProducts + 4;
    const nextVisibleProducts = Math.min(newVisibleProducts, totalProducts);
    setVisibleProducts(nextVisibleProducts);
  };

  return (
    <div className="container mt-10">
      <select
        id="categories"
        name="category"
        value={categories}
        className="px-5"
      >
        {categories &&
          categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
      </select>
      <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3  sm:grid-cols-2">
        {products.slice(0, visibleProducts).map((item) => (
          <div
            className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex flex-col justify-center items-center"
            style={{
              background: "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
            }}
          >
            <div className="group relative inline-flex justify-center overflow-hidden items-center">
              <Link href={`/${item.id}`}>
                <img
                  src={`${API_URL}/${item.imageUrl}`}
                  alt={`slide-${item.id}`}
                  className="hover:-translate-y-1 hover:scale-105  duration-300 sm:w-full sm:block flex items-center w-[7.5rem] object-contain"
                />
              </Link>
              <div className="!absolute h-10  text-text-1 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ">
                <button
                  type="button"
                  className="bg-primry text-white py-1.5 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
                  onClick={handleAddCart}
                >
                  <ShoppingCart />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
            {item.discount > 0 && (
              <span className="!absolute top-0 left-0 bg-primry font-poppins text-sm font-normal py-[4px] sm:px-[25px] px-[10px] text-white">
                -{item.discount}%
              </span>
            )}
            <div className="flex flex-col gap-[6px]">
              <p className="font-roboto text-sm font-normal flex justify-center xxl:truncate text-center">
                {item.productName}
              </p>
              <span className="font-roboto text-sm font-normal flex justify-center">
                {item.code}
              </span>
              <div className="flex justify-around">
                {item.discount ? (
                  <>
                    <span className="font-roboto text-sm flex justify-center text-primry font-semibold">
                      {numeral(
                        item.price - (item.price * item.discount * 1) / 100
                      ).format("0,0")}
                      đ
                    </span>
                    <span className="font-roboto text-sm flex justify-center text-gray line-through">
                      {numeral(item.price).format("0,0")}đ
                    </span>
                  </>
                ) : (
                  <p className="font-roboto text-sm flex justify-center text-primry font-semibold">
                    {numeral(item.price).format("0,0")}đ
                  </p>
                )}
              </div>
              <Divider>
                <Button
                  // type="primary"
                  className="bg-slate-800 text-white hover:bg-white hover:text-black"
                  onClick={() => {
                    router.push(`/${item.id}`);
                  }}
                >
                  Chi tiết
                </Button>
              </Divider>
              {/* <div className="flex justify-between px-[0.5rem]">
                  <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                      <p>{item.rating.rate}</p>
                      <p>({item.rating.count})</p>
                  </div>
                  <p className="font-roboto text-sm opacity-50 font-normal">{item.sell} <span>đã bán</span></p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <span className="flex justify-center font-elle mt-7 mb-3">
        Hiển thị {visibleProducts}/{totalProducts}
      </span>
      {visibleProducts < totalProducts && (
        <button
          className=" block mx-auto py-3 px-5 mb-10 border border-primry text-black bg-white hover:bg-primry hover:text-white transition-colors duration-300"
          onClick={handleShowMore}
        >
          XEM THÊM SẢN PHẨM
        </button>
      )}
    </div>
  );
}

export default memo(Products);

export async function getStaticProps() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      axiosClient.get("/products"),
      axiosClient.get("/categories"),
    ]);

    return {
      props: {
        products: productsResponse.data,
        categories: categoriesResponse.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
