import { toDateString } from "../utils/dateRanges";

function PeriodNavigator({
  filter,
  setFilter,
  currentLabel,
  referenceDate,
  onPrevious,
  onNext,
  onDatePick,
  dateInputRef,
  onOpenDatePicker,
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-0.5 min-w-0">
        <button
          onClick={onPrevious}
          aria-label="Previous period"
          className="text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors px-1.5 py-1 text-lg leading-none"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={onOpenDatePicker}
          className="relative px-1 py-1 text-sm font-semibold text-gray-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-400 transition-colors truncate max-w-[160px]"
        >
          {currentLabel}
          <input
            ref={dateInputRef}
            type="date"
            value={toDateString(referenceDate)}
            onChange={onDatePick}
            aria-label="Pick a date"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none dark:[color-scheme:dark]"
          />
        </button>

        <button
          onClick={onNext}
          aria-label="Next period"
          className="text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors px-1.5 py-1 text-lg leading-none"
        >
          ›
        </button>
      </div>

      <div className="flex bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg shrink-0 transition-colors">
        {["daily", "monthly", "yearly"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
              filter === f
                ? "bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PeriodNavigator;