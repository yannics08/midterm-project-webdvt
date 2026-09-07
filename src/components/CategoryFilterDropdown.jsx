import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CategoryFilterDropdown({ category, setCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "All Categories", "Food", "Transportation", "Shopping", "Bills",
    "Entertainment", "Education", "Health", "Allowance", "Salary",
    "Gift", "Other Expense", "Other Income"
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-left outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 transition-colors"
      >
        <span className="text-gray-900 dark:text-gray-200">
          {category || "All Categories"}
        </span>

        {isOpen ? (
          <ChevronUp size={18} strokeWidth={1.5} className="text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown size={18} strokeWidth={1.5} className="text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="max-h-48 overflow-y-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item === "All Categories" ? "" : item);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:hover:text-purple-400 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryFilterDropdown;