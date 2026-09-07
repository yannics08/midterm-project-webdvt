import { useTransactions } from "../context/TransactionContext";
import FinancialOverview from "../components/FinancialOverview";
import CategoryMiniBreakdown from "../components/CategoryMiniBreakdown";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const { transactions } = useTransactions();

  // Filter transactions to only include the current month
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
          
          {/* Left Column (50%): Combined Financial Overview */}
          <div className="flex flex-col w-full">
            <FinancialOverview />
          </div>

          {/* Right Column (50%): Category Breakdown */}
          <div className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg shadow-purple-500/5 border border-purple-500/20 dark:border-purple-500/10 transition-colors flex flex-col h-full">
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