import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../components/layout/MainLayout";
import { formatCurrency } from "../utils/format";
import { Search, ArrowUpDown } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
};

const ITEMS_PER_PAGE = 20;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price");
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get("/products?limit=100").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // 🔍 Filter & Sort
  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "price" ? a.price - b.price : b.rating - a.rating,
    );

  // 📄 Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        {/* 🔍 SEARCH & SORT (MODERN) */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg
                         border border-slate-200 bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Sort */}
          <select
            className="w-full px-3 py-2 text-sm rounded-lg
                       border border-slate-200 bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {/* 📊 TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-slate-600">
                  <div className="flex items-center gap-1">
                    Name <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-semibold text-slate-600">
                  Price
                </th>
                <th className="p-3 text-left text-sm font-semibold text-slate-600">
                  Rating
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 text-sm text-slate-700">{p.title}</td>
                  <td className="p-3 text-sm text-slate-700">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="p-3 text-sm text-slate-700">{p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📄 PAGINATION */}
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
