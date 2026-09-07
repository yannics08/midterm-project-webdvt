import { useNavigate } from "react-router-dom";
import {
  Utensils, Car, ShoppingBag, Receipt, Film, GraduationCap,
  HeartPulse, Wallet, Banknote, Gift as GiftIcon, CircleEllipsis,
} from "lucide-react";

const CATEGORY_STYLES = {
  Food: { icon: Utensils, bg: "bg-orange-100 dark:bg-orange-500/20", text: "text-orange-600 dark:text-orange-400", badgeBg: "bg-orange-50 dark:bg-orange-500/10", badgeText: "text-orange-700 dark:text-orange-300" },
  Transportation: { icon: Car, bg: "bg-blue-100 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", badgeBg: "bg-blue-50 dark:bg-blue-500/10", badgeText: "text-blue-700 dark:text-blue-300" },
  Shopping: { icon: ShoppingBag, bg: "bg-pink-100 dark:bg-pink-500/20", text: "text-pink-600 dark:text-pink-400", badgeBg: "bg-pink-50 dark:bg-pink-500/10", badgeText: "text-pink-700 dark:text-pink-300" },
  Bills: { icon: Receipt, bg: "bg-amber-100 dark:bg-amber-500/20", text: "text-amber-600 dark:text-amber-400", badgeBg: "bg-amber-50 dark:bg-amber-500/10", badgeText: "text-amber-700 dark:text-amber-300" },
  Entertainment: { icon: Film, bg: "bg-purple-100 dark:bg-purple-500/20", text: "text-purple-600 dark:text-purple-400", badgeBg: "bg-purple-50 dark:bg-purple-500/10", badgeText: "text-purple-700 dark:text-purple-300" },
  Education: { icon: GraduationCap, bg: "bg-indigo-100 dark:bg-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400", badgeBg: "bg-indigo-50 dark:bg-indigo-500/10", badgeText: "text-indigo-700 dark:text-indigo-300" },
  Health: { icon: HeartPulse, bg: "bg-red-100 dark:bg-red-500/20", text: "text-red-600 dark:text-red-400", badgeBg: "bg-red-50 dark:bg-red-500/10", badgeText: "text-red-700 dark:text-red-300" },
  Allowance: { icon: Wallet, bg: "bg-teal-100 dark:bg-teal-500/20", text: "text-teal-600 dark:text-teal-400", badgeBg: "bg-teal-50 dark:bg-teal-500/10", badgeText: "text-teal-700 dark:text-teal-300" },
  Salary: { icon: Banknote, bg: "bg-green-100 dark:bg-green-500/20", text: "text-green-600 dark:text-green-400", badgeBg: "bg-green-50 dark:bg-green-500/10", badgeText: "text-green-700 dark:text-green-300" },
  Gift: { icon: GiftIcon, bg: "bg-fuchsia-100 dark:bg-fuchsia-500/20", text: "text-fuchsia-600 dark:text-fuchsia-400", badgeBg: "bg-fuchsia-50 dark:bg-fuchsia-500/10", badgeText: "text-fuchsia-700 dark:text-fuchsia-300" },
  Other: { icon: CircleEllipsis, bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-600 dark:text-gray-400", badgeBg: "bg-gray-100 dark:bg-gray-800", badgeText: "text-gray-700 dark:text-gray-300" },
};

function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
}

function Transaction({ transaction, showCategory = true, compact = false }) {
  const navigate = useNavigate();
  const { icon: Icon, bg, text, badgeBg, badgeText } = getCategoryStyle(
    transaction.category
  );

  return (
    <div
      onClick={() => navigate(`/transactions/${transaction.id}`)}
      className={`flex items-center justify-between rounded-xl cursor-pointer transition-colors ${
        compact
          ? "p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          : "p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`${
            compact ? "w-9 h-9" : "w-11 h-11"
          } rounded-xl flex items-center justify-center shrink-0 ${bg}`}
        >
          <Icon className={`${compact ? "w-4 h-4" : "w-5 h-5"} ${text}`} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {transaction.name}
          </h3>

          <div className="flex items-center gap-2 mt-0.5">
            {showCategory && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeBg} ${badgeText}`}
              >
                {transaction.category}
              </span>
            )}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {transaction.date}
            </span>
          </div>
        </div>
      </div>

      <p
        className={`font-semibold shrink-0 ml-3 ${
          transaction.type === "income"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}₱
        {transaction.amount.toLocaleString()}
      </p>
    </div>
  );
}

export default Transaction;