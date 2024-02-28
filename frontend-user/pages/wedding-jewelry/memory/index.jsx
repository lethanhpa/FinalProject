import React, { memo, useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import Link from "next/link";

function Memory() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const listMemoryJewelry = [
    {
      id: "1",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "2",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://vangbac24h.vn/wp-content/uploads/2020/10/kim-c%C6%B0%C6%A1ng.png",
      code: "PNDIHFA000",
      price: 41500000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "3",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://cdn.pnj.io/images/detailed/35/gndrwa73675.5a0-nhan-kim-cuong-pnj-vang-trang.png",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "4",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "5",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "6",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "7",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "8",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "9",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "10",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "11",
      name: "Lắc kim cương tấm vàng 14K",
      image1:
        "https://product.hstatic.net/1000381168/product/upload_e4abe6a2a413438c993d1f746f439fa3_master.jpg",
      code: "PNDIHFA000",
      price: 41500000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
  ];

  const itemsPerPage = 8;

  const currentItems = paginate(listMemoryJewelry, itemsPerPage, currentPage);

  return (
    <>
      <div className="border-b border-primry pb-8 ">
        <div className="mt-[3.125rem] flex justify-center w-full">
          <img
            src="https://www.mulloysjewelry.com/cdn/shop/collections/Memoire_Top_Banner_2307x630.jpg?v=1683717094"
            alt="trang-suc-cuoi"
          />
        </div>
        <p className="font-roboto font-medium text-primry text-xl mt-[50px] flex justify-center">
          QUÀ KỶ NIỆM
        </p>
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 lg:py-6 md:grid md:grid-cols-2 md:gap-8 md:py-6 ssm:block">
          {currentItems.map((item) => {
            return (
              <Link
                key={item.id}
                href="./id"
                className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex justify-center items-center "
              >
                <div className="flex flex-col gap-[8px]">
                  <div className="flex justify-center items-center mb-4">
                    <img
                      src={item.image1}
                      alt={item.id}
                      className="sm:w-1/2 mt-14 sm:block w-[120px] object-cover transform transition-transform duration-300 hover:scale-125"
                    />
                  </div>
                  <p className="font-roboto text-sm font-normal flex justify-center truncate">
                    {item.name}
                  </p>
                  <span className="font-roboto text-sm font-normal flex justify-center">
                    {item.code}
                  </span>
                  <span className="font-roboto text-sm flex justify-center text-primry font-semibold">
                    {item.price}đ
                  </span>
                  <div className="flex justify-between px-[1rem] mb-5">
                    <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                      <p>{item.rating.rate}</p>
                      <p>({item.rating.count})</p>
                    </div>
                    <p className="font-roboto text-sm opacity-50 font-normal ">
                      {item.sell} <span>đã bán</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border border-primry rounded text-sm bg-gray-200"
          >
            Trang trước
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage}
            className="ml-2 px-4 py-2 border border-primry rounded text-sm bg-gray-200"
          >
            Trang tiếp theo
          </button>
        </div>
      </div>
    </>
  );
}
export default memo(Memory);
