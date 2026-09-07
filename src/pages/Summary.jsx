import { useState, useRef } from "react";
import { useTransactions } from "../context/TransactionContext";
import TrendBadge from "../components/TrendBadge";
import PeriodNavigator from "../components/PeriodNavigator";
import CategoryDonutChart from "../components/CategoryDonutChart";
import CategoryBreakdownList from "../components/CategoryBreakdownList";
import {
  toDateString,
  parseDateInputValue,
  shiftReferenceDate,
  getPeriodRanges,
} from "../utils/dateRanges";

const CATEGORY_COLORS = {
  Food: "#f97316", // orange-500
  Transportation: "#3b82f6", // blue-500
  Shopping: "#ec4899", // pink-500
  Bills: "#f59e0b", // amber-500
  Entertainment: "#a855f7", // purple-500
  Education: "#6366f1", // indigo-500
  Health: "#ef4444", // red-500
  Allowance: "#14b8a6", // teal-500
  Salary: "#22c55e", // green-500
  Gift: "#d946ef", // fuchsia-500
  "Other Expense": "#6b7280", // gray-500
  "Other Income": "#6b7280", // gray-500
  Other: "#6b7280", // gray-500
};

const DEFAULT_COLOR = "#9ca3af";

function Summary() {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState("monthly"); 
  const [referenceDate, setReferenceDate] = useState(new Date());
  const dateInputRef = useRef(null);

  const { current, previous } = getPeriodRanges(filter, referenceDate);
  const isCurrentPeriodNow = current.matches(toDateString(new Date()));

  const goToPrevious = () => setReferenceDate((prev) => shiftReferenceDate(prev, filter, -1));
  const goToNext = () => setReferenceDate((prev) => shiftReferenceDate(prev, filter, 1));
  const goToToday = () => setReferenceDate(new Date());

  const handleDatePick = (e) => {
    if (!e.target.value) return;
    setReferenceDate(parseDateInputValue(e.target.value));
  };

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
      input.click();
    }
  };

  const expenses = transactions.filter((t) => t.type === "expense");
  const filteredExpenses = expenses.filter((t) => current.matches(t.date));
  const previousExpenses = expenses.filter((t) => previous.matches(t.date));

  const categoryTotals = {};
  const categoryCounts = {};
  let totalSpending = 0;

  filteredExpenses.forEach((t) => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
      categoryCounts[t.category] = 0;
    }
    categoryTotals[t.category] += t.amount;
    categoryCounts[t.category] += 1;
    totalSpending += t.amount;
  });

  const previousTotalSpending = previousExpenses.reduce((sum, t) => sum + t.amount, 0);

  const categoriesArray = Object.keys(categoryTotals)
    .map((category) => ({
      category,
      amount: categoryTotals[category],
      count: categoryCounts[category],
      percentage: totalSpending > 0 ? (categoryTotals[category] / totalSpending) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const highestCategory = categoriesArray.length > 0 ? categoriesArray[0].category : "None";
  const highestAmount = categoriesArray.length > 0 ? categoriesArray[0].amount : 0;
  const totalCategories = categoriesArray.length;
  const hasAnySpending = totalSpending > 0;

  const categoriesWithColor = categoriesArray.map((cat) => ({
    ...cat,
    color: CATEGORY_COLORS[cat.category] || DEFAULT_COLOR,
  }));

  const transactionsByCategory = {};
  filteredExpenses.forEach((t) => {
    if (!transactionsByCategory[t.category]) {
      transactionsByCategory[t.category] = [];
    }
    transactionsByCategory[t.category].push(t);
  });
  Object.values(transactionsByCategory).forEach((list) =>
    list.sort((a, b) => (a.date < b.date ? 1 : -1))
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 flex flex-col items-center transition-colors">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 space-y-8 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Summary</h2>
            {!isCurrentPeriodNow && (
              <button
                onClick={goToToday}
                className="text-xs font-medium text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
              >
                Jump to today
              </button>
            )}
          </div>

          <PeriodNavigator
            filter={filter}
            setFilter={setFilter}
            currentLabel={current.label}
            referenceDate={referenceDate}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onDatePick={handleDatePick}
            dateInputRef={dateInputRef}
            onOpenDatePicker={openDatePicker}
          />
        </div>

        {/* Headline: Total Spending */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-white transition-colors shadow-sm">
          <h3 className="text-sm font-medium text-gray-300 dark:text-gray-400 mb-1 transition-colors">
            Total Spending
          </h3>
          <div className="flex items-end justify-between flex-wrap gap-2">
            <p className="text-3xl font-bold">₱{totalSpending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <TrendBadge current={totalSpending} previous={previousTotalSpending} />
          </div>
          <p className="text-xs text-gray-400 mt-1 transition-colors">
            vs ₱{previousTotalSpending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in {previous.label}
          </p>
        </div>

        {/* 2 Horizontal Layout Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl p-5 border border-purple-100 dark:border-purple-500/20 transition-colors">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1 transition-colors">
              Highest Spending Category
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
              {highestCategory}
            </p>
            {highestCategory !== "None" ? (
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1 transition-colors">
                ₱{highestAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 transition-colors">₱0.00</p>
            )}
          </div>
          <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-5 border border-blue-100 dark:border-blue-500/20 transition-colors">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1 transition-colors">
              Total Categories
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
              {totalCategories}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 transition-colors">
              Categories with expenses
            </p>
          </div>
        </div>

        {/* Expense Breakdown: Donut chart + Category list */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Expense Breakdown
          </h3>
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            <CategoryDonutChart
              categories={categoriesWithColor}
              hasAnySpending={hasAnySpending}
            />

            <div className="flex-1 min-w-0">
              <CategoryBreakdownList
                categories={categoriesWithColor}
                transactionsByCategory={transactionsByCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;