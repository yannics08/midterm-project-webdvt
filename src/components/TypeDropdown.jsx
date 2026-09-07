import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function TypeDropdown({ type, setType }) {
  const [isOpen, setIsOpen] = useState(false);

  const types = [
    {
      value: "expense",
      label: "Expense",
    },
    {
      value: "income",
      label: "Income",
    },
  ];

  const selectedType = types.find((item) => item.value === type);

  return (
    <div className="relative h-[76px]">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Type
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 text-left outline-none focus:ring-2 focus:ring-purple-600"
      >
        <span className={type ? "text-gray-900" : "text-gray-400"}>
        {selectedType?.label || "Select a type"}
        </span>

        {isOpen ? (
          <ChevronUp
            size={18}
            strokeWidth={1.5}
            className="text-gray-500"
          />
        ) : (
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className="text-gray-500"
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {types.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setType(item.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypeDropdown;