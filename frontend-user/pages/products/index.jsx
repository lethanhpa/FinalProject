// import React, { memo, useState, useEffect } from "react";
// import { Star, ChevronDown, ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import numeral from "numeral";
// import { Badge, Card, message } from "antd";
// import Image from "next/image";

// function Products() {
//   const [showFilters, setShowFilters] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Call it initially to set the initial state

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleAddCart = (productId) => {
//     addToCart(productId);
//   };

//   const listProducts = [
//     {
//       id: "1",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       discount: 10,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "2",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://vangbac24h.vn/wp-content/uploads/2020/10/kim-c%C6%B0%C6%A1ng.png",
//       code: "PNDIHFA000",
//       price: 6151000,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "3",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/35/gndrwa73675.5a0-nhan-kim-cuong-pnj-vang-trang.png",
//       code: "PNDIHFA000",
//       price: 6151000,
//       discount: 10,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "4",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       discount: 10,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "5",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "6",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "7",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "8",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       discount: 10,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//     {
//       id: "9",
//       productName: "Nhẫn kim cương vàng trắng 14k",
//       image1:
//         "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//       code: "PNDIHFA000",
//       price: 6151000,
//       sell: "10",
//       rating: { rate: <Star />, count: "2" },
//     },
//   ];

//   return (
//     <div className="container">
//       <div className="p-4 flex">
//         <div
//           className="font-roboto mb-3 cursor-pointer flex items-center"
//           onClick={() => setShowFilters(!showFilters)}
//         >
//           <span className="left-0">Bộ lọc</span>
//           <ChevronDown />
//         </div>
//         {showFilters && (
//           <div className="flex space-x-6 justify-between border mx-12 px-2 py-2">
//             <div className="flex flex-col">
//               <div className="font-roboto mb-1">Khoảng giá</div>
//               <div className="space-y-1">
//                 <div className="space-y-1">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Nhỏ hơn 1,000,000₫</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Từ 1,000,000₫ - 3,000,000₫</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Từ 3,000,000₫ - 5,000,000₫</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Từ 5,000,000₫ - 7,000,000₫</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Từ 7,000,000₫ - 10,000,000₫</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Lớn hơn 10,000,000₫</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <div className="font-roboto mb-1">Màu sắc</div>
//               <div className="space-y-1">
//                 <div className="space-y-1">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Vàng Vàng</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Vàng Trắng</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <span className="ml-2">Vàng Hồng</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <div className="font-roboto mb-1">Chất liệu</div>
//               <div className="space-y-1">
//                 <div className="space-y-1">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 text-yellow-400"
//                     />
//                     <span className="ml-2">10k</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4 text-gray-300" />
//                     <span className="ml-2">14k</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4 text-pink-600" />
//                     <span className="ml-2">18k</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <div className="font-roboto mb-1">Đá đính kèm</div>
//               <div className="space-y-1">
//                 <div className="space-y-1">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 text-yellow-400"
//                     />
//                     <span className="ml-2">Kim Cương</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4 text-gray-300" />
//                     <span className="ml-2">Đá Cubic Zirconia</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="h-4 w-4 text-pink-600" />
//                     <span className="ml-2">Đá Ruby/Sapphire</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="bottom flex">
//               <div className="mr-5 cursor-pointer underline">Hủy</div>
//               <div className="cursor-pointer border bg-black text-white px-4 py-2">
//                 Áp dụng
//               </div>
//             </div>
//           </div>
//         )}
//         <div>Sắp xếp theo:</div>
//       </div>
//       <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3  sm:grid-cols-2">
//         {listProducts.length > 0 &&
//           listProducts.map((item) => {
//             return (
//               <Card
//                 style={{
//                   background:
//                     "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
//                 }}
//                 className="border rounded-4"
//                 bordered={false}
//               >
//                 <Link href={`/${item.id}`}>
//                   <div className="relative">
//                     <Card
//                       className="border-none text-center flex flex-1 justify-center items-center"
//                       style={{
//                         background:
//                           "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
//                       }}
//                     >
//                       <img
//                         width={300}
//                         height={150}
//                         className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300"
//                         alt={item.name}
//                         src={item.image1}
//                       />
//                     </Card>
//                     <div className="absolute h-10 text-text-1 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all">
//                       <button
//                         type="button"
//                         className="bg-primry text-white py-1.5 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
//                         onClick={handleAddCart}
//                       >
//                         <ShoppingCart />
//                         Thêm vào giỏ hàng
//                       </button>
//                     </div>
//                     {item.discount && (
//                       <span className="absolute top-0 left-0 bg-primry font-poppins text-sm font-normal py-[4px] sm:px-[25px] px-[10px] text-white">
//                         -{item.discount}%
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//                 <div
//                   className={`flex flex-col gap-[6px] text-center ${
//                     windowWidth < 1400 ? "truncate" : ""
//                   }`}
//                 >
//                   <p className="font-roboto text-sm font-normal flex justify-center truncate">
//                     {item.productName}
//                   </p>
//                   <span className="font-roboto text-sm font-normal flex justify-center">
//                     {item.code}
//                   </span>
//                   <div className="flex justify-around">
//                     {item.discount ? (
//                       <>
//                         <span className="font-roboto text-sm flex justify-center text-primry font-semibold">
//                           {numeral(
//                             item.price - (item.price * item.discount * 1) / 100
//                           ).format("0,0")}
//                           đ
//                         </span>
//                         <span className="font-roboto text-sm flex justify-center text-gray line-through">
//                           {numeral(item.price).format("0,0")}đ
//                         </span>
//                       </>
//                     ) : (
//                       <p className="font-roboto text-sm flex justify-center text-primry font-semibold">
//                         {numeral(item.price).format("0,0")}đ
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex justify-between px-[0.5rem]">
//                     <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
//                       <p>{item.rating.rate}</p>
//                       <p>({item.rating.count})</p>
//                     </div>
//                     <p className="font-roboto text-sm opacity-50 font-normal">
//                       {item.sell} <span>đã bán</span>
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// export default memo(Products);
import { Card } from "antd";
import router from "next/router";
import React, { useState, memo } from "react";
import { Star, ShoppingCart } from "lucide-react";
import numeral from "numeral";
import axiosClient from "@/libraries/axiosClient";
import { API_URL } from "@/constants";

function Products({ products }) {
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
      <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3  sm:grid-cols-2">
        {products.slice(0, visibleProducts).map((item) => (
          <Card
            key={item.id}
            style={{
              background: "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
            }}
            className="border rounded-4"
          >
            {item.discount && (
              <span className="!absolute top-0 left-0 bg-primry font-poppins text-sm font-normal py-[2px] sm:px-[15px] px-[5px] text-white">
                -{item.discount}%
              </span>
            )}
            <div className="group relative inline-flex justify-center overflow-hidden items-center">
              <Card
                onClick={() => {
                  router.push(`/${item.id}`);
                }}
                className="border-none text-center flex flex-1 justify-center items-center "
                style={{
                  background:
                    "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                }}
              >
                <img
                  src={`${API_URL}/${item.imageUrl}`}
                  alt={`slide-${item.id}`}
                  className="sm:w-full sm:block flex items-center w-[7.5rem] object-contain cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-125  duration-300"
                />
              </Card>

              <div className="!absolute h-10  text-text-1 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ">
                <button
                  type="button"
                  className="bg-primry text-white py-1.5 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
                  onClick={() => handleAddCart(item.id)}
                >
                  <ShoppingCart />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[6px] ">
              <p className="font-roboto text-sm font-normal flex justify-center truncate">
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

              <div className="flex justify-between px-[0.5rem]">
                <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                  <p style={{ color: "#FFC107" }}></p>
                  {/* <p>({item.rating.count})</p> */}
                </div>
                <p className="font-roboto text-sm opacity-50 font-normal">
                  {item.sell} <span>đã bán</span>
                </p>
              </div>
            </div>
          </Card>
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
    const response = await axiosClient.get("/products");

    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
