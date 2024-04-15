import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/router";

function Payment() {
  const router = useRouter();
  const { vnp_TransactionStatus } = router.query; // Đổi tên biến này để phản ánh query parameter thực tế
  console.log('««««« vnp_TransactionStatus »»»»»', vnp_TransactionStatus);

  // Kiểm tra xem TransactionStatus có tồn tại và có giá trị là "00" hay không
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

export default memo(Payment);
