import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

type Props = {
  onToggle?: () => void;
};

export default function Navbar({ onToggle }: Props) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/products":
        return "Products";
      case "/recipes":
        return "Recipes";
      case "/carts":
        return "Carts";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>

          <div>
            <p className="text-xs text-slate-400">Pages</p>
            <h1 className="text-lg font-semibold text-slate-800 tracking-tight">
              {getTitle()}
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium text-slate-700">Admin</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
