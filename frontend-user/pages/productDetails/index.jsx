import { useEffect, useRef } from "react";
import axiosClient from "@/libraries/axiosClient";

const useProductDetails = (productId) => {
  const productDetailsRef = useRef(null);
  const isMountedRef = useRef(false); // Biến này để đảm bảo rằng useEffect chỉ được gọi sau khi component đã được mount

  useEffect(() => {
    if (!isMountedRef.current && productId) {
      isMountedRef.current = true; // Đánh dấu component đã được mount
      const fetchProductDetails = async () => {
        try {
          const response = await axiosClient.get(
            `/products/${productId}`,
          );
          productDetailsRef.current = response.data.result;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [productId]);

  return productDetailsRef.current;
};

export default useProductDetails;
