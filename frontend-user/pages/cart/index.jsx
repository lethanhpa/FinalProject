import React, { memo, useState, useEffect } from "react";
import {
  Minus,
  Plus,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Trash2,
  Undo,
} from "lucide-react";
import { message, Popconfirm } from "antd";
import Link from "next/link";
import numeral from "numeral";
import { API_URL } from "@/constants";
import useCartStore from "@/store/CartStore";
import UseCart from "../productDetails/index";
import { jwtDecode } from "jwt-decode";


function Carts() {
  const [customerId, setCustomerId] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCustomerId(decoded._id);
    }
  }, []);
  

  const { getCartItems, updateCartItemQuantity, removeFromCart } =
    useCartStore();

  const cartItems = getCartItems(customerId);
  console.log('cartItems', cartItems);


  const HandleDeleteCart = (productId) => {
    removeFromCart(productId);
  };


  const HandleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCartItemQuantity(updatedCart[index].id, updatedCart[index].quantity);
  };

  const HandleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCartItemQuantity(
        updatedCart[index].id,
        updatedCart[index].quantity,
      );
    }
  };

  let total = 0;

  // cartItems.forEach((item) => {
  //   const CartId = UseCart(item.productId);
  //   if (CartId) {
  //     total += (CartId?.price *
  //       (100 - CartId?.discount)) /
  //       100 * item.quantity;
  //   }
  // });

  const text = "Bạn có muốn xóa sản phẩm ?";

  const getProductDetails = UseCart();

  return (
    <div>
      <img src="https://file.hstatic.net/1000381168/file/baner-thanh-toan_78c520df795d4667b36605c554655bb1_master.png" />
      <table className="w-full mb-10">
        <thead className="bg-black text-white font-roboto space-x-4">
          <tr>
            <th className="border w-1/2 py-3">SẢN PHẨM</th>
            <th className="border w-1/12 py-3">SỐ LƯỢNG</th>
            <th className="border w-1/6 py-3">ĐƠN GIÁ</th>
            <th className="border w-1/6 py-3">THÀNH TIỀN</th>
            <th className="border w-1/12 py-3">
              <div className="flex justify-center items-center">
                <AlertCircle />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 && cartItems.map((item) => {
              // const CartId = getProductDetails(item.productId);
              // console.log('CartId',CartId);
              return(
                <p>{item.productId}
                </p>
              )
             
          }
          
          //  <p>{item.quantity}</p>
          )}
          {/* {
            cartItems.length > 0 && cartItems.map((item, index) => {
              const CartId = UseCart(item.productId);
              return (
                <>
                  {
                    CartId ? (<tr key={item._id} className="container mt-10 border-b border-slate-400">
                      <td className="flex items-center  justify-start">
                        <p className="mr-4 my-5">
                          <img
                            className="w-[150px] bg-pink"
                            src={`${API_URL}/${CartId?.imageUrl}`}
                            alt="Product Image"
                          />
                        </p>
                        <p>
                          <p className="font-elle font-light">
                            {CartId?.productName}
                          </p>
                          {CartId?.size && (
                            <p>
                              <strong>Size:</strong>
                              <span className="ml-3">{CartId?.size}</span>
                            </p>
                          )}
                        </p>
                      </td>
                      <td>
                        <span className="lg:max-w-[72px] max-w-[50px] max-h-[35px] flex lg:max-h-[44px] relative ">
                          <input
                            style={{ width: "80%" }}
                            // type="number"
                            value={item.quantity}
                            min="1"
                            max={CartId?.stock}
                            className=
                            "lg:py-1 py-0 px-2 flex border"
                          />
                          <p className="absolute top-1 right-6 cursor-pointer items-center">
                            <ChevronUp
                              className="lg:w-[16px] lg:h-[16px] h-[14px] w-[14px]"
                              onClick={() => HandleIncrease(index)}
                            />
                            <ChevronDown
                              className="lg:w-[16px] lg:h-[16px] h-[14px] w-[14px]"
                              onClick={() => HandleDecrease(index)}
                            />
                          </p>
                        </span>
                      </td>
                      <td>
                        <p className="flex justify-center items-center">
                          {numeral(
                            (CartId?.price *
                              (100 - CartId?.discount)) /
                            100
                          ).format("0,0")}
                          đ
                        </p>
                      </td>
                      <td>
                        <p className="flex justify-center items-center font-bold">
                          {numeral(
                            ((CartId.price *
                              (100 - CartId.discount)) /
                              100) *
                            item.quantity
                          ).format("0,0")}
                          đ
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <Popconfirm
                            placement="top"
                            title={text}
                            onConfirm={() => {
                              HandleDeleteCart(token,item?.productId);
                              message.success("Delete successfully!");
                            }}
                            okText="Có"
                            cancelText="Không"
                            okButtonProps={{
                              style: { color: "white", background: "black" },
                            }}
                            cancelButtonProps={{
                              style: { color: "black", background: "white " },
                            }}
                          >
                            <button>
                              <Trash2 size={24} strokeWidth={1} />
                            </button>
                          </Popconfirm>
                        </div>
                      </td>


                    </tr>) : (<p>Loadding...</p>)
                  }
                </>

              )
            })
          } */}
        </tbody>
      </table>
      {/* <div className="my-10 flex justify-end container">
        <div className="my-3">
          <div className="flex justify-end">
            <div className="flex">
              <CircleDollarSign size={24} strokeWidth={1} />
              <p className="ml-2 font-roboto font-bold text-xl">
                TỔNG TIỀN (tạm tính)
              </p>
            </div>
            <div className="ml-10">
              <span className="font-roboto font-bold text-lg">
                {numeral(total).format("0,0")}đ
              </span>
            </div>
          </div>
          <div className="my-3 flex justify-end">
            <span className="font-roboto w-3/4">
              Thời gian nhận hàng từ 7 - 15 ngày (trường hợp sớm hơn chúng
              tôi sẽ thông báo trước cho Quý khách!)
            </span>
          </div>
          <div className="my-3 flex justify-end">
            <div className="mr-3">
              <Link href="/products">
                <button className="flex border py-3 px-6 bg-gray hover:bg-white text-white hover:text-black font-elle">
                  <Undo className="mr-3" size={24} strokeWidth={1} /> CHỌN
                  THÊM SẢN PHẨM KHÁC
                </button>
              </Link>
            </div>
            <div className="ml-3">
              <button className="flex border py-3 px-20 bg-black hover:bg-white text-white hover:text-black font-elle">
                THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default memo(Carts);