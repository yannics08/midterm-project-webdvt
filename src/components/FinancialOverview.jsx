import { useTransactions } from "../context/TransactionContext";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const FinancialOverview = () => {
  const { balance, income, expenses } = useTransactions();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/95 via-purple-800/85 to-purple-950/98 dark:from-purple-950/95 dark:via-purple-900/85 dark:to-black/98 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl shadow-purple-900/20 border border-purple-500/30 text-white w-full h-full flex flex-col justify-center gap-6 transition-all duration-300">
      {/* Glow Effects */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

      {/* Current Balance Section */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-6 pb-6 border-b border-white/10 shrink-0">
        <div className="p-3.5 sm:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner text-white shrink-0">
          <Wallet size={32} strokeWidth={2} />
        </div>
        
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-semibold text-purple-200/80 uppercase tracking-widest">
            Current Balance
          </h4>
          <div
            id="balance"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-1 tracking-tight truncate"
          >
            ₱{balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      {/* Income & Expenses Split Section */}
      {/* Removed flex-1 and min-h-[100px] to prevent vertical stretching */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Total Income */}
        {/* Removed h-full and justify-center to fix the layout dimensions */}
        <div className="bg-purple-300/10 dark:bg-purple-900/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-purple-300/20 dark:border-purple-700/30 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:bg-purple-300/20 dark:hover:bg-purple-900/50">
          <div className="p-2 sm:p-3 bg-white/5 rounded-xl text-green-400 shrink-0 border border-white/5">
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[10px] sm:text-xs font-bold text-purple-200/70 uppercase tracking-wider">
              Total Income
            </h4>
            <div
              id="income"
              className="text-base sm:text-lg font-bold text-green-400 mt-0.5 tracking-tight truncate"
            >
              +₱{income.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-purple-300/10 dark:bg-purple-900/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-purple-300/20 dark:border-purple-700/30 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:bg-purple-300/20 dark:hover:bg-purple-900/50">
          <div className="p-2 sm:p-3 bg-white/5 rounded-xl text-red-400 shrink-0 border border-white/5">
            <TrendingDown size={20} strokeWidth={2.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[10px] sm:text-xs font-bold text-purple-200/70 uppercase tracking-wider">
              Total Expenses
            </h4>
            <div
              id="expenses"
              className="text-base sm:text-lg font-bold text-red-400 mt-0.5 tracking-tight truncate"
            >
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

export default FinancialOverview;