import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AreaChart() {
  const [categories, setCategories] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products?limit=100");

      const group = res.data.products.reduce((acc: any, item: any) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      setCategories(Object.keys(group));
      setCounts(Object.values(group));
    };

    fetchProducts();
  }, []);

  return (
    <Chart
      type="area"
      height={300}
      series={[
        {
          name: "Products",
          data: counts,
        },
      ]}
      options={{
        chart: { toolbar: { show: false } },
        colors: ["#1E3A8A"],
        xaxis: { categories },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
      }}
    />
  );
}
