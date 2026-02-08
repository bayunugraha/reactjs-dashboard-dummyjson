import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function BarChart() {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [totals, setTotals] = useState<number[]>([]);

  useEffect(() => {
    const fetchCarts = async () => {
      const res = await api.get("/carts?limit=10");

      setCartIds(res.data.carts.map((c: any) => `Cart ${c.id}`));
      setTotals(res.data.carts.map((c: any) => c.total));
    };

    fetchCarts();
  }, []);

  return (
    <Chart
      type="bar"
      height={320}
      series={[
        {
          name: "Total Price",
          data: totals,
        },
      ]}
      options={{
        colors: ["#3B82F6"],
        plotOptions: {
          bar: { borderRadius: 6, columnWidth: "45%" },
        },
        xaxis: { categories: cartIds },
        dataLabels: { enabled: false },
      }}
    />
  );
}
