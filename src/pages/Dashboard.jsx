import { Link } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import Balance from "../components/Balance";
import IncomeExpense from "../components/IncomeExpense";
import CategoryMiniBreakdown from "../components/CategoryMiniBreakdown";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const { transactions } = useTransactions();

  // 1. Filter transactions to only include the current month
  const currentMonthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const now = new Date();
    return (
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 transition-colors">
            Track your finances at a glance.
          </p>
        </div>

        {/* Top Section: 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Column (50%): Balance & Income/Expense */}
          <div className="flex flex-col gap-6 w-full">
            <Balance />
            <IncomeExpense />
          </div>

          {/* Right Column (50%): Category Breakdown */}
          <div className="w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors flex flex-col h-full">
            
            {/* 2. Pass the filtered array here instead of all transactions */}
            <CategoryMiniBreakdown
              transactions={currentMonthTransactions}
              topN={5}
              size={160}
            />

          </div>
        </div>

        {/* Bottom Section: Full Width Transaction List */}
        <div className="w-full [&>div]:max-w-none">
          <TransactionList />
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;