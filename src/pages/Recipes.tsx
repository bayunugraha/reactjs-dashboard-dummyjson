import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../components/layout/MainLayout";
import { UtensilsCrossed, Tag } from "lucide-react";

type Recipe = {
  id: number;
  name: string;
  tags: string[];
  mealType: string;
};

const ITEMS_PER_PAGE = 10;

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pageTags, setPageTags] = useState(1);
  const [pageMeals, setPageMeals] = useState(1);
  const [pageRecipes, setPageRecipes] = useState(1);

  useEffect(() => {
    api.get("/recipes?limit=100").then((res) => {
      setRecipes(res.data.recipes);
    });
  }, []);

  /* =======================
     DATA PROCESSING
  ======================= */

  const totalRecipes = recipes.length;

  // Group by Tags
  const tagMap: Record<string, number> = {};
  recipes.forEach((r) =>
    r.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    }),
  );
  const tagEntries = Object.entries(tagMap);

  // Group by Meal Type
  const mealMap: Record<string, number> = {};
  recipes.forEach((r) => {
    mealMap[r.mealType] = (mealMap[r.mealType] || 0) + 1;
  });
  const mealEntries = Object.entries(mealMap);

  // Pagination helpers
  const paginate = <T,>(data: T[], page: number) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  /* =======================
     UI
  ======================= */

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 🔢 TOTAL RECIPES */}
        <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
            <UtensilsCrossed size={22} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Recipes</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              {totalRecipes}
            </h2>
          </div>
        </div>

        {/* 🏷️ RECIPES BY TAG */}
        <SectionTable
          title="Recipes by Tags"
          icon={<Tag size={16} />}
          headers={["Tag", "Total Recipes"]}
          rows={paginate(tagEntries, pageTags).map(([tag, count]) => [
            tag,
            count,
          ])}
          page={pageTags}
          total={tagEntries.length}
          onPageChange={setPageTags}
        />

        {/* 🍽️ RECIPES BY MEAL TYPE */}
        <SectionTable
          title="Recipes by Meal Type"
          icon={<UtensilsCrossed size={16} />}
          headers={["Meal Type", "Total Recipes"]}
          rows={paginate(mealEntries, pageMeals).map(([meal, count]) => [
            meal,
            count,
          ])}
          page={pageMeals}
          total={mealEntries.length}
          onPageChange={setPageMeals}
        />

        {/* 📋 ALL RECIPES */}
        <SectionTable
          title="Recipes List"
          headers={["Name", "Tags", "Meal Type"]}
          rows={paginate(recipes, pageRecipes).map((r) => [
            r.name,
            r.tags.join(", "),
            r.mealType,
          ])}
          page={pageRecipes}
          total={recipes.length}
          onPageChange={setPageRecipes}
        />
      </div>
    </MainLayout>
  );
}

/* =======================
   REUSABLE TABLE SECTION
======================= */

function SectionTable({
  title,
  headers,
  rows,
  page,
  total,
  onPageChange,
  icon,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  page: number;
  total: number;
  onPageChange: (p: number) => void;
  icon?: React.ReactNode;
}) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 flex items-center gap-2 font-semibold text-slate-700">
        {icon}
        {title}
      </div>

      <table className="w-full table-auto">
        <thead className="bg-slate-50 border-b">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="p-3 text-left text-sm font-semibold text-slate-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t hover:bg-slate-50 transition">
              {row.map((cell, j) => (
                <td key={j} className="p-3 text-sm text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2 p-3">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
