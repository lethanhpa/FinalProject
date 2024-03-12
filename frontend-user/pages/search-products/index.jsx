"use client";
import React, { memo } from "react";
import { API_URL } from "@/constants";
import axiosClient from "@/libraries/axiosClient";
import { Star } from "lucide-react";
import Link from "next/link";
import numeral from "numeral";
import { Button, Divider, FloatButton } from "antd";

function SearchProduct({ products }) {
  return (
    <div className="container mt-5">
      <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2 mx-2.5">
        {products &&
          products.map((item) => {
            return (
              <div
                key={item._id}
                className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex flex-col justify-center items-center"
                style={{
                  background:
                    "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                }}
              >
                <div className="group relative inline-flex justify-center overflow-hidden items-center">
                  <Link href={`/${item.id}`}>
                    <img
                      src={`${API_URL}/${item.imageUrl}`}
                      alt={`slide-${item.id}`}
                      className="hover:-translate-y-1 hover:scale-125  duration-300 sm:w-full sm:block flex items-center w-[7.5rem] object-contain"
                    />
                  </Link>
                  {item.discount > 0 && (
                    <div className="!absolute top-0 right-0 bg-primry font-poppins text-sm font-normal py-[4px] sm:px-[25px] px-[10px] text-white">
                      -{item.discount}%
                    </div>
                  )}
                </div>
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
                      className="bg-black text-white hover:bg-white font-light"
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
            );
          })}
      </div>
      <FloatButton.BackTop />
    </div>
  );
}

export default memo(SearchProduct);

export async function getServerSideProps({ query }) {
  const searchQuery = query.q || "";

  const response = await axiosClient.get("/products");

  const product = response.data;

  const filteredProducts = product.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    props: {
      products: filteredProducts,
    },
  };
}
