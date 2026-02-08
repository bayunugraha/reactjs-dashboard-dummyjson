import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: string;
};

export default function SummaryCard({
  title,
  value,
  icon,
  color = "bg-blue-100 text-blue-600",
}: Props) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex items-center gap-4">
      {icon && <div className={`p-3 rounded-lg ${color}`}>{icon}</div>}

      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <h2 className="text-2xl font-semibold text-slate-800">{value}</h2>
      </div>
    </div>
  );
}
