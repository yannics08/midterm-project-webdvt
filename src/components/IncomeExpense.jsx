import { useTransactions } from "../context/TransactionContext";
import { TrendingUp, TrendingDown } from "lucide-react";

const IncomeExpense = () => {
  const { income, expenses } = useTransactions();

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full">
      {/* Income Card */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-gray-700/50 flex-1 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-2xl text-green-600 dark:text-green-400 shrink-0 transition-colors">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>
          
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors">
              Total Income
            </h4>
            <div className="text-2xl md:text-3xl font-extrabold text-green-600 dark:text-green-400 mt-1 tracking-tight truncate transition-colors">
              +₱{income.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-gray-700/50 flex-1 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-2xl text-red-600 dark:text-red-400 shrink-0 transition-colors">
            <TrendingDown size={24} strokeWidth={2.5} />
          </div>
          
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors">
              Total Expenses
            </h4>
            <div className="text-2xl md:text-3xl font-extrabold text-red-600 dark:text-red-400 mt-1 tracking-tight truncate transition-colors">
              -₱{expenses.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpense;