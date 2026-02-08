import { useEffect, useState } from "react";
import api from "../api/axios";

// cards & layout
import SummaryCard from "../components/cards/SummaryCard";
import MainLayout from "../components/layout/MainLayout";

// charts
import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";

import { Package, UtensilsCrossed, ShoppingCart, FileText } from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    products: 0,
    recipes: 0,
    carts: 0,
    posts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [products, recipes, carts, posts] = await Promise.all([
        api.get("/products"),
        api.get("/recipes"),
        api.get("/carts"),
        api.get("/posts"),
      ]);

      setSummary({
        products: products.data.total,
        recipes: recipes.data.total,
        carts: carts.data.total,
        posts: posts.data.total,
      });
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      {/* SUMMARY CARDS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Products"
          value={summary.products}
          icon={<Package size={22} />}
          color="bg-blue-100 text-blue-700"
        />
        <SummaryCard
          title="Total Recipes"
          value={summary.recipes}
          icon={<UtensilsCrossed size={22} />}
          color="bg-slate-100 text-slate-700"
        />
        <SummaryCard
          title="Total Carts"
          value={summary.carts}
          icon={<ShoppingCart size={22} />}
          color="bg-indigo-100 text-indigo-700"
        />
        <SummaryCard
          title="Total Posts"
          value={summary.posts}
          icon={<FileText size={22} />}
          color="bg-sky-100 text-sky-700"
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="bg-card rounded-xl p-4 shadow-sm border lg:col-span-2">
          <h3 className="font-semibold text-secondary mb-2">
            Products per Category
          </h3>
          <AreaChart />
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-xl p-4 shadow-sm border">
          <h3 className="font-semibold text-secondary mb-2">
            Recipes by Meal Type
          </h3>
          <PieChart />
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-xl p-4 shadow-sm border lg:col-span-3">
          <h3 className="font-semibold text-secondary mb-2">
            Total Price per Cart
          </h3>
          <BarChart />
        </div>
      </div>
    </MainLayout>
  );
}
