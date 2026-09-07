import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Health",
  "Other Expense",
];

const INCOME_CATEGORIES = [
  "Allowance",
  "Salary",
  "Gift",
  "Other Income",
];

function CategoryDropdown({ category, setCategory, type = "expense" }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="relative h-[76px]">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
        Category
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-left outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 transition-colors"
      >
        <span className={category ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}>
          {category || "Select a category"}
        </span>

        {isOpen ? (
          <ChevronUp
            size={18}
            strokeWidth={1.5}
            className="text-gray-500 dark:text-gray-400"
          />
        ) : (
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className="text-gray-500 dark:text-gray-400"
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-colors">
          <div className="max-h-40 overflow-y-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
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

export default CategoryDropdown;