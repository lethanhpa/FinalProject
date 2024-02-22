import React, { memo, useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import Link from "next/link";

function Products() {
  const [showFilters, setShowFilters] = useState(false);
  const listProducts = [
    {
      id: "1",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "2",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product2.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "3",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product3.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "4",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "5",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "6",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "7",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "8",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
    {
      id: "9",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "./img/product1.png",
      code: "PNDIHFA000",
      price: "6.151.000",
      sell: "10",
      rating: { rate: <Star />, count: "2" },
    },
  ];

  return (
    <div className="pt-[2.5rem]">
      <div className="p-4 flex">
        <div
          className="font-roboto mb-3 cursor-pointer flex items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="left-0">Bộ lọc</span>
          <ChevronDown />
        </div>
        {showFilters && (
          <div className="flex space-x-6 justify-between border mx-12 px-2 py-2">
            <div className="flex flex-col">
              <div className="font-roboto mb-1">Khoảng giá</div>
              <div className="space-y-1">
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Nhỏ hơn 1,000,000₫</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Từ 1,000,000₫ - 3,000,000₫</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Từ 3,000,000₫ - 5,000,000₫</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Từ 5,000,000₫ - 7,000,000₫</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Từ 7,000,000₫ - 10,000,000₫</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Lớn hơn 10,000,000₫</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-roboto mb-1">Màu sắc</div>
              <div className="space-y-1">
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Vàng Vàng</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Vàng Trắng</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Vàng Hồng</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-roboto mb-1">Chất liệu</div>
              <div className="space-y-1">
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-yellow-400"
                    />
                    <span className="ml-2">10k</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-gray-300"
                    />
                    <span className="ml-2">14k</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pink-600"
                    />
                    <span className="ml-2">18k</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-roboto mb-1">Đá đính kèm</div>
              <div className="space-y-1">
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-yellow-400"
                    />
                    <span className="ml-2">Kim Cương</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-gray-300"
                    />
                    <span className="ml-2">Đá Cubic Zirconia</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pink-600"
                    />
                    <span className="ml-2">Đá Ruby/Sapphire</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="bottom flex">
              <div className="mr-5 cursor-pointer underline">Hủy</div>
              <div className="cursor-pointer border bg-black text-white px-4 py-2">
                Áp dụng
              </div>
            </div>
          </div>
        )}
        <div>
          Sắp xếp theo:
        </div>
      </div>
      <div className="flex flex-wrap justify-between mx-16">
        {listProducts &&
          listProducts.map((item, index) => {
            return (
              <div
                key={item.id}
                className="product mb-4 sm:w-[calc(25%-1rem)] px-0"
              >
                <Link
                  href="./id"
                  className="min-w-[100px] min-h-[100px] sm:min-w-[15.625rem] sm:min-h-[12.5rem] border border-slate-600 rounded:none hover:bg-second-3 flex justify-center items-center"
                >
                  <div className="flex flex-col gap-[6px]">
                    <img
                      src={item.src}
                      alt={`slide-${item.id}`}
                      className="sm:w-full sm:block flex items-center w-[120px] object-cover"
                    />
                    <p className="font-roboto text-sm font-normal flex justify-center truncate">
                      {item.name}
                    </p>
                    <span className="font-roboto text-sm font-normal flex justify-center">
                      {item.code}
                    </span>
                    <span className="font-roboto text-sm flex justify-center text-primry font-roboto">
                      {item.price}đ
                    </span>
                    <div className="flex justify-between px-[0.5rem]">
                      <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                        <p>{item.rating.rate}</p>
                        <p>({item.rating.count})</p>
                      </div>
                      <p className="font-roboto text-sm opacity-50 font-normal">
                        {item.sell} <span>đã bán</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(Products);
