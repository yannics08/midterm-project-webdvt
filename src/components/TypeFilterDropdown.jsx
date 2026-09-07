import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function TypeFilterDropdown({ type, setType }) {
  const [isOpen, setIsOpen] = useState(false);

  const types = [
    { value: "", label: "All Types" },
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" },
  ];

  const selectedType = types.find((item) => item.value === type);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-left outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 transition-colors"
      >
        <span className="text-gray-900 dark:text-gray-200">
          {selectedType?.label || "All Types"}
        </span>

        {isOpen ? (
          <ChevronUp size={18} strokeWidth={1.5} className="text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown size={18} strokeWidth={1.5} className="text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
          {types.map((item) => (
            <button
              key={item.value || "all"}
              type="button"
              onClick={() => {
                setType(item.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:hover:text-purple-400 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypeFilterDropdown;