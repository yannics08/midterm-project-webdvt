import { percentChange } from "../utils/dateRanges";

function TrendBadge({ current, previous }) {
  const change = percentChange(current, previous);
  if (change === null) {
    return (
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 transition-colors">New this period</span>
    );
  }
  if (change === 0) {
    return <span className="text-xs font-medium text-gray-400 dark:text-gray-500 transition-colors">No change</span>;
  }
  const isIncrease = change > 0;
  return (
    <span
      className={`text-xs font-semibold transition-colors ${
        isIncrease ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
      }`}
    >
      {isIncrease ? "▲" : "▼"} {Math.abs(change).toFixed(1)}% vs last period
    </span>
  );
}

export default TrendBadge;