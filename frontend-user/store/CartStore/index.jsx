import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        carts: {},

        addToCart: (
          customerId,
          productId,
          quantity,
          productName,
          imageUrl,
          price,
          discount,
          stock
        ) => {
          console.log("customerId", customerId);
          set((state) => {
            const customerCart = state.carts[customerId] || [];
            const existingProductIndex = customerCart.findIndex(
              (item) => item.productId === productId
            );
            if (existingProductIndex !== -1) {
              customerCart[existingProductIndex].quantity += quantity;
            } else {
              customerCart.push({
                productId,
                quantity,
                productName,
                imageUrl,
                price,
                discount,
                stock,
              });
            }
            return {
              carts: {
                ...state.carts,
                [customerId]: customerCart,
              },
            };
          });
        },

        getCartItems: (customerId) => {
          return get().carts[customerId] || [];
        },

        updateCartItemQuantity: (customerId, productId, quantity) => {
          set((state) => {
            const customerCart = state.carts[customerId] || [];
            const updatedCart = customerCart.map((item) => {
              if (item.productId === productId) {
                return {
                  ...item,
                  quantity: quantity,
                };
              }
              return item;
            });
            return {
              carts: {
                ...state.carts,
                [customerId]: updatedCart,
              },
            };
          });
        },

        removeFromCart: (customerId, productId) => {
          set((state) => {
            const customerCart = state.carts[customerId] || [];
            const updatedCart = customerCart.filter(
              (item) => item.productId !== productId
            );
            return {
              carts: {
                ...state.carts,
                [customerId]: updatedCart,
              },
            };
          });
        },

        removeAllCart: (customerId) => {
          set((state) => ({
            carts: {
              ...state.carts,
              [customerId]: [],
            },
          }));
        },
      }),
      {
        name: "cartStorage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useCartStore;
