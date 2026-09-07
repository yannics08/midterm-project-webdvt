import { useTransactions } from "../context/TransactionContext";
import { Wallet } from "lucide-react";

const Balance = () => {
  const { balance } = useTransactions();

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-gray-700/50 w-full transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3.5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg shadow-purple-500/30 text-white shrink-0">
          <Wallet size={28} strokeWidth={2} />
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors">
            Current Balance
          </h4>
          <h1
            id="balance"
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight transition-colors"
          >
            ₱{balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Balance;