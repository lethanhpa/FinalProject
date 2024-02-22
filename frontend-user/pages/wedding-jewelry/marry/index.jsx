import React, { memo } from "react";
import { StarOutlined } from "@ant-design/icons";
import Link from "next/link";

function Marry() {
  const listMarryJewelry = [
    {
      id: "1",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "2",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://vangbac24h.vn/wp-content/uploads/2020/10/kim-c%C6%B0%C6%A1ng.png",
      code: "PNDIHFA000",
      price: 6151000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "3",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/35/gndrwa73675.5a0-nhan-kim-cuong-pnj-vang-trang.png",
      code: "PNDIHFA000",
      price: 6151000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "4",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "5",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "6",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "7",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
    {
      id: "8",
      name: "Nhẫn kim cương vàng trắng 14k",
      src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      discount: 10,
      sell: "10",
      rating: { rate: <StarOutlined />, count: "2" },
    },
  ];

  return (
    <>
      <div>
        <div className="mt-[3.125rem] flex justify-center w-full">
          <img
            src="https://file.hstatic.net/1000381168/collection/1920x820px_26f943dfb45a417eba1d409288cd08c0.png"
            alt="trang-suc-cuoi"
          />
        </div>
        <p className="font-roboto font-medium text-primry text-xl mt-[50px] flex justify-center">
          NHẪN CƯỚI
        </p>
        <div className="grid grid-cols-4 gap-8 py-6">
          {listMarryJewelry &&
            listMarryJewelry.map((item) => {
              return (
                <Link
                  key={item.id}
                  href="./id"
                  className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex justify-center items-center "
                >
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex justify-center items-center">
                      <img
                        src={item.src}
                        alt={item.id}
                        className="sm:w-1/2 sm:block w-[120px] object-cover"
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
      </div>
    </>
  );
}
export default memo(Marry);
