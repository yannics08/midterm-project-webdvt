import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  PlusCircle,
  Wallet,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-purple-700 text-white shadow-md shadow-purple-500/30"
        : "text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:hover:text-purple-300"
    }`;

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl fixed left-0 top-0 flex flex-col z-50 transition-colors">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-700 to-purple-500 p-2 rounded-xl shadow-lg shadow-purple-500/40">
            <Wallet className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white transition-colors">
              YAM
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
              Budget Tracker
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2 flex-1">
        <NavLink to="/dashboard" className={linkStyle}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/summary" className={linkStyle}>
          <PieChart size={20} />
          <span>Summary</span>
        </NavLink>

        <NavLink to="/add-transaction" className={linkStyle}>
          <PlusCircle size={20} />
          <span>Add Transaction</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 transition-colors">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span className="font-medium text-sm">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;