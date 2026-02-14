import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../components/layout/MainLayout";
import { formatCurrency } from "../utils/format";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const ITEMS_PER_PAGE = 20;

export default function Carts() {
  const [carts, setCarts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // ✅ Zustand Cart
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const checkout = useCartStore((state) => state.checkout);

  useEffect(() => {
    api.get("/carts").then((res) => setCarts(res.data.carts));
  }, []);

  // 📄 Pagination API carts
  const totalPages = Math.ceil(carts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCarts = carts.slice(start, start + ITEMS_PER_PAGE);

  // 💰 Total Zustand Cart
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
            <ShoppingCart size={20} />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Cart Overview
          </h2>
        </div>

        {/* ===================== */}
        {/* 🛒 ZUSTAND CART TABLE */}
        {/* ===================== */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <div className="p-4 border-b font-semibold text-slate-700">
            Your Cart
          </div>

          {items.length === 0 ? (
            <div className="p-6 text-center text-slate-500">Cart is empty</div>
          ) : (
            <>
              <table className="w-full min-w-[700px] table-auto">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-3 text-center text-sm font-semibold">
                      ID
                    </th>
                    <th className="p-3 text-left text-sm font-semibold">
                      Product
                    </th>
                    <th className="p-3 text-center text-sm font-semibold">
                      Qty
                    </th>
                    <th className="p-3 text-left text-sm font-semibold">
                      Subtotal
                    </th>
                    <th className="p-3 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-3 text-center text-sm">{item.id}</td>

                      <td className="p-3 text-sm">{item.title}</td>

                      <td className="p-3 text-sm text-center">
                        {item.quantity}
                      </td>

                      <td className="p-3 text-sm font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TOTAL + CHECKOUT */}
              <div className="p-4 border-t space-y-3">
                <p className="text-right font-semibold text-slate-700">
                  Total: {formatCurrency(total)}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={checkout}
                    className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-500 transition"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ===================== */}
        {/* 📊 API CART HISTORY   */}
        {/* ===================== */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <div className="p-4 border-b font-semibold text-slate-700">
            Carts Transactions (API)
          </div>

          <table className="w-full min-w-[700px] table-auto">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-3 text-center text-sm font-semibold">ID</th>
                <th className="p-3 text-center text-sm font-semibold">
                  Total Products
                </th>
                <th className="p-3 text-left text-sm font-semibold">Total</th>
                <th className="p-3 text-left text-sm font-semibold">
                  Discount
                </th>
                <th className="p-3 text-left text-sm font-semibold">
                  After Discount
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedCarts.map((cart) => (
                <tr
                  key={cart.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 text-center text-sm">{cart.id}</td>

                  <td className="p-3 text-center text-sm">
                    {cart.totalProducts}
                  </td>

                  <td className="p-3 text-sm">{formatCurrency(cart.total)}</td>

                  <td className="p-3 text-sm text-red-600">
                    {formatCurrency(cart.total - cart.discountedTotal)}
                  </td>

                  <td className="p-3 text-sm font-medium text-emerald-600">
                    {formatCurrency(cart.discountedTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                page === i + 1
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
