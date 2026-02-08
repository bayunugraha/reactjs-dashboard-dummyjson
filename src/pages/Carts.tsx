import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../components/layout/MainLayout";
import { formatCurrency } from "../utils/format";
import { ShoppingCart } from "lucide-react";

const ITEMS_PER_PAGE = 20;

export default function Carts() {
  const [carts, setCarts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get("/carts").then((res) => setCarts(res.data.carts));
  }, []);

  // 📄 Pagination
  const totalPages = Math.ceil(carts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCarts = carts.slice(start, start + ITEMS_PER_PAGE);

  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
            <ShoppingCart size={20} />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Carts Transactions
          </h2>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-3 text-center text-sm font-semibold text-slate-600">
                  ID
                </th>
                <th className="p-3 text-center text-sm font-semibold text-slate-600">
                  Total Products
                </th>
                <th className="p-3 text-left text-sm font-semibold text-slate-600">
                  Total
                </th>
                <th className="p-3 text-left text-sm font-semibold text-slate-600">
                  Discount
                </th>
                <th className="p-3 text-left text-sm font-semibold text-slate-600">
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
                  <td className="p-3 text-center text-sm text-slate-700">
                    {cart.id}
                  </td>
                  <td className="p-3 text-center text-sm text-slate-700">
                    {cart.totalProducts}
                  </td>
                  <td className="p-3 text-sm text-slate-700">
                    {formatCurrency(cart.total)}
                  </td>
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
        <div className="flex flex-wrap justify-center items-center gap-2 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 text-sm rounded-lg border
                       bg-white hover:bg-slate-100 disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition
                ${
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
            className="px-3 py-1.5 text-sm rounded-lg border
                       bg-white hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
