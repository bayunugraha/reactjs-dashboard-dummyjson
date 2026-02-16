import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Bell } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

type Props = {
  onToggle?: () => void;
};

export default function Navbar({ onToggle }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const hasCheckout = useCartStore((state) => state.hasCheckout);
  const resetCheckout = useCartStore((state) => state.resetCheckout);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

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
        <div className="flex items-center gap-6">
          {/* Checkout Notification */}
          {hasCheckout && (
            <button
              onClick={() => {
                navigate("/carts");
                resetCheckout();
              }}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition"
            >
              <Bell className="w-4 h-4" />
              Checkout Success
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={() => navigate("/carts")}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition"
          >
            <ShoppingCart className="w-5 h-5 text-slate-700" />

            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>

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
