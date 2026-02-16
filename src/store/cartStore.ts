import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  hasCheckout: boolean; // ✅ notifikasi checkout
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  checkout: () => void;
  clearCart: () => void;
  resetCheckout: () => void; // ✅ reset notifikasi
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasCheckout: false, // ✅ default

      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      checkout: () => {
        set({
          items: [],
          hasCheckout: true, // ✅ trigger notifikasi
        });
      },

      clearCart: () =>
        set({
          items: [],
        }),

      resetCheckout: () =>
        set({
          hasCheckout: false, // ✅ hilangkan notifikasi
        }),
    }),
    {
      name: "cart-storage", // 🔥 key localStorage
    },
  ),
);
