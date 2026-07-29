import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Newspaper, Images, MessageSquare } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const links = [
  { to: "/admin", label: "Blogs", icon: Newspaper },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminNav() {
  const { admin, logout } = useAdminAuth();
  const location = useLocation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
      <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-700 rounded-2xl p-1.5">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                active
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400 hidden sm:block">{admin?.email}</span>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-semibold rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
