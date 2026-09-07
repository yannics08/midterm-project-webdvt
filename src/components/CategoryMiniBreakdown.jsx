import { useMemo } from "react";
import { Link } from "react-router-dom";
import CategoryDonutChart from "./CategoryDonutChart";

const DONUT_COLORS = [
  "#7e22ce", // purple-700
  "#2563eb", // blue-600
  "#db2777", // pink-600
  "#059669", // emerald-600
  "#d97706", // amber-600
  "#6b7280", // gray-500
];

function CategoryMiniBreakdown({ transactions = [], topN = 4 }) {
  const { segments, hasData } = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");

    const totals = {};
    expenses.forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

    const total = Object.values(totals).reduce((sum, v) => sum + v, 0);

    const sorted = Object.entries(totals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    const top = sorted.slice(0, topN);
    const rest = sorted.slice(topN);
    const otherAmount = rest.reduce((sum, c) => sum + c.amount, 0);

    const grouped = [...top];
    if (otherAmount > 0) {
      grouped.push({ category: "Other", amount: otherAmount });
    }

    const segments = grouped.map((cat, i) => ({
      ...cat,
      percentage: total > 0 ? (cat.amount / total) * 100 : 0,
      color: DONUT_COLORS[i % DONUT_COLORS.length],
    }));

    return { segments, hasData: total > 0 };
  }, [transactions, topN]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header & Link */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
            Category Breakdown
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
            This is your spending for this month
          </p>
        </div>
        <Link
          to="/summary"
          className="text-sm font-medium text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors mt-0.5"
        >
          View Summary
        </Link>
      </div>

      {/* Chart & Legend Section */}
      <div className="flex-1 flex flex-row items-center gap-10 w-full py-2">
        
        {/* Reused Donut Chart Component - Increased Size */}
        <CategoryDonutChart 
          categories={segments} 
          hasAnySpending={hasData} 
          size={140} 
          radius={50} 
          strokeWidth={16} 
        />

        {/* Legend with Progress Lines & Amounts */}
        <div className="flex-1 min-w-0 space-y-4">
          {hasData ? (
            segments.map((seg) => (
              <div key={seg.category} className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-sm">
                  
                  {/* Category Name */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: seg.color }}
                    ></div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium truncate transition-colors">
                      {seg.category}
                    </span>
                  </div>

                  {/* Amount & Percentage */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                      ₱{seg.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 font-medium w-9 text-right transition-colors">
                      {seg.percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                {/* Visual Progress Line */}
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden transition-colors">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${seg.percentage}%`,
                      backgroundColor: seg.color,
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-left text-gray-400 dark:text-gray-500">No expenses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryMiniBreakdown;