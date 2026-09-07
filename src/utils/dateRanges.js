export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function pad(n) {
  return String(n).padStart(2, "0");
}

export function toDateString(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Parses a "YYYY-MM-DD" string (from a <input type="date">) as a local date,
// avoiding the UTC-shift bug that `new Date("YYYY-MM-DD")` has.
export function parseDateInputValue(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Moves a reference date forward/backward by one unit of the active filter.
// direction: 1 for next, -1 for previous.
export function shiftReferenceDate(date, filter, direction) {
  const next = new Date(date);
  if (filter === "daily") {
    next.setDate(next.getDate() + direction);
  } else if (filter === "monthly") {
    // Pin to the 1st before shifting months so we don't skip/overshoot
    // months with fewer days than the current day-of-month.
    next.setDate(1);
    next.setMonth(next.getMonth() + direction);
  } else {
    next.setFullYear(next.getFullYear() + direction);
  }
  return next;
}

// Returns { current: {label, matches(dateStr)}, previous: {label, matches(dateStr)} }
export function getPeriodRanges(filter, referenceDate) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth(); // 0-indexed
  const day = referenceDate.getDate();

  if (filter === "daily") {
    const current = new Date(year, month, day);
    const previous = new Date(year, month, day - 1);
    const currentStr = toDateString(current);
    const previousStr = toDateString(previous);
    return {
      current: {
        label: `${MONTH_NAMES[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`,
        matches: (d) => d === currentStr,
      },
      previous: {
        label: `${MONTH_NAMES[previous.getMonth()]} ${previous.getDate()}, ${previous.getFullYear()}`,
        matches: (d) => d === previousStr,
      },
    };
  }

  if (filter === "monthly") {
    const currentPrefix = `${year}-${pad(month + 1)}`;
    const prevDate = new Date(year, month - 1, 1);
    const previousPrefix = `${prevDate.getFullYear()}-${pad(prevDate.getMonth() + 1)}`;
    return {
      current: {
        label: `${MONTH_NAMES[month]} ${year}`,
        matches: (d) => d.startsWith(currentPrefix),
      },
      previous: {
        label: `${MONTH_NAMES[prevDate.getMonth()]} ${prevDate.getFullYear()}`,
        matches: (d) => d.startsWith(previousPrefix),
      },
    };
  }

  // yearly
  const currentYearStr = String(year);
  const previousYearStr = String(year - 1);
  return {
    current: {
      label: currentYearStr,
      matches: (d) => d.startsWith(currentYearStr),
    },
    previous: {
      label: previousYearStr,
      matches: (d) => d.startsWith(previousYearStr),
    },
  };
}

export function percentChange(current, previous) {
  if (previous === 0) {
    return current > 0 ? null : 0; // null = "new spending, no prior baseline"
  }
  return ((current - previous) / previous) * 100;
}