import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform`}
      >
        <Sidebar />
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        <Navbar onToggle={() => setOpen(!open)} />
        <main className="p-3 sm:p-4 md:p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
