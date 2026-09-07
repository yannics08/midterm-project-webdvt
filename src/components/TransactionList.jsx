import { useState } from "react";
import Transaction from "./Transaction";
import { useTransactions } from "../context/TransactionContext";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryFilterDropdown from "./CategoryFilterDropdown";
import TypeFilterDropdown from "./TypeFilterDropdown";

function TransactionList() {
  const { transactions } = useTransactions();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const hasActiveFilters = categoryFilter || typeFilter;

  const filteredTransactions = transactions.filter((t) => {
    if (categoryFilter && t.category !== categoryFilter) return false;
    if (typeFilter && t.type !== typeFilter) return false;
    return true;
  });

  const clearFilters = () => {
    setCategoryFilter("");
    setTypeFilter("");
  };

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>

        <Link
          to="/add-transaction"
          className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition"
        >
          <Plus size={18} />
          Add
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CategoryFilterDropdown
          category={categoryFilter}
          setCategory={setCategoryFilter}
        />

        <TypeFilterDropdown type={typeFilter} setType={setTypeFilter} />
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transaction{transactions.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
            No transactions match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionList;