import { useEffect } from "react";
import { useRouter } from "next/router";
import axiosClient from "@/libraries/axiosClient";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

function Payment() {
  const router = useRouter();
  const { vnp_TransactionStatus } = router.query;

  useEffect(() => {
    const deleteOrder = async (orderId) => {
      try {
        await axiosClient.patch(`orders/return-stock/${orderId}`);
        await axiosClient.delete(`/orders/${orderId}`);
      } catch (error) {
        console.error(
          "Lỗi khi xóa đơn hàng và hoàn trả số lượng sản phẩm:",
          error
        );
      }
    };

    const handlePaymentResult = async () => {
      const orderId = localStorage.getItem("orderId");
      if (!orderId) return;

      if (vnp_TransactionStatus === "00") {
        localStorage.removeItem("orderId");
      } else if (vnp_TransactionStatus) {
        try {
          await deleteOrder(orderId);

          localStorage.removeItem("orderId");
        } catch (error) {
          console.error("Lỗi khi xóa đơn hàng từ database:", error);
        }
      }
    };

    handlePaymentResult();
  }, [vnp_TransactionStatus]);

  const isSuccess = vnp_TransactionStatus === "00";

  return (
    <div className="border border-transparent my-20 mx-60 rounded-2xl shadow-2xl">
      <div>
        <div className="flex justify-center items-center mt-10">
          {isSuccess ? (
            <CheckCircle size={70} strokeWidth={1.3} />
          ) : (
            <XCircle size={70} strokeWidth={1.3} />
          )}
        </div>
        <p className="flex justify-center items-center font-bold text-xl font-elle">
          {isSuccess ? "Đặt hàng thành công" : "Giao dịch thất bại"}
        </p>
        <p className="flex justify-center items-center font-bold font-elle">
          {isSuccess
            ? "Cảm ơn bạn đã tin tưởng và sử dụng sản phẩm của chúng tôi"
            : "Giao dịch của bạn không thành công. Vui lòng thử lại sau."}
        </p>
      </div>
      <div className="flex justify-around items-center mx-40 my-10">
        <Link href="/products">
          <button className="border rounded-md py-1 px-1 bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0">
            Tiếp tục mua hàng
          </button>
        </Link>
        <Link href="/">
          <button className="border rounded-md py-1 px-1 bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0">
            Quay lại trang chủ
          </button>
        </Link>
        <Link href="/purchase-history">
          <button className="border rounded-md py-1 px-1 bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0">
            Lịch sử mua hàng
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;
