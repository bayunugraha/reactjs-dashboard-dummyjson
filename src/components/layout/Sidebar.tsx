import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  UtensilsCrossed,
  ShoppingCart,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Recipes",
    path: "/recipes",
    icon: UtensilsCrossed,
  },
  {
    name: "Carts",
    path: "/carts",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen p-4 pt-20  md:pt-4">
      <h1 className="text-xl font-bold mb-6 tracking-wide">
        Dashboard<br></br>DummyJson
      </h1>

      <nav className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-blue-100 hover:bg-blue-800"
                }`
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
