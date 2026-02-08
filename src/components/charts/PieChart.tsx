import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PieChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await api.get("/recipes?limit=10");

      const group = res.data.recipes.reduce((acc: any, item: any) => {
        acc[item.mealType] = (acc[item.mealType] || 0) + 1;
        return acc;
      }, {});

      setLabels(Object.keys(group));
      setSeries(Object.values(group));
    };

    fetchRecipes();
  }, []);

  return (
    <Chart
      type="pie"
      height={280}
      series={series}
      options={{
        labels,
        colors: ["#1E3A8A", "#3B82F6", "#94A3B8"],
        legend: { position: "bottom" },
      }}
    />
  );
}
