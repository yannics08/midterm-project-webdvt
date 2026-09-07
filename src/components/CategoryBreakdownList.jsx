import { useState } from "react";
import Transaction from "./Transaction";

function CategoryBreakdownList({ categories, transactionsByCategory }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (categories.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
        No category expenses recorded for this period.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((cat) => {
        const isExpanded = expandedCategory === cat.category;
        const catTransactions = transactionsByCategory[cat.category] || [];
        return (
          <div
            key={cat.category}
            className="rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors"
          >
            <button
              onClick={() =>
                setExpandedCategory(isExpanded ? null : cat.category)
              }
              className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <div className="min-w-0">
                    <span className="font-medium text-gray-700 dark:text-gray-200 truncate block transition-colors">
                      {cat.category}
                    </span>
                    <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors">
                      {cat.count} transaction{cat.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">
                    {cat.percentage.toFixed(1)}%
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[70px] text-right transition-colors">
                    ${cat.amount.toFixed(2)}
                  </span>
                  <span
                    className={`text-gray-400 dark:text-gray-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden transition-colors">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color,
                  }}
                ></div>
              </div>
            </button>
            {isExpanded && (
              <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-gray-100 dark:border-gray-700/50 transition-colors">
                {catTransactions.map((t) => (
                  <Transaction
                    key={t.id}
                    transaction={t}
                    showCategory={false}
                    compact
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryBreakdownList;