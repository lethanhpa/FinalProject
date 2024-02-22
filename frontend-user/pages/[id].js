import React, { memo } from "react";

import axiosClient from "@/libraries/axiosClient";

function ProductDetails({ product }) {

  const listpProduct = [
    {
      id: "1",
      productName: "Nhẫn kim cương vàng trắng 14k",
      image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      image2: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      image3: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      image4: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
      code: "PNDIHFA000",
      price: 6151000,
      discount: 10,
      sell: "10",
      size : "10",
  },
  ]

    return (
        <div>
            {product ? (<div key={product.id}>
                <p>{product.title}</p>
            </div>) : (<p>heeelo</p>)
            }
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
      const response = await axiosClient.get(
        `https://fakestoreapi.com/products/${params.id}`,
      );
      console.log("response",response.data)
      return {
        props: {
          product: response.data,
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
