function CategoryDonutChart({ 
  categories, 
  hasAnySpending, 
  size = 192, 
  radius = 70, 
  strokeWidth = 28 
}) {
  const circumference = 2 * Math.PI * radius;
  const viewBoxSize = (radius + strokeWidth) * 2;
  const center = viewBoxSize / 2;

  let cumulativePercent = 0;
  const segments = categories.map((cat) => {
    const dashLength = (cat.percentage / 100) * circumference;
    const segment = {
      ...cat,
      dasharray: `${dashLength} ${circumference - dashLength}`,
      dashoffset: -((cumulativePercent / 100) * circumference),
    };
    cumulativePercent += cat.percentage;
    return segment;
  });

  return (
    <div className="flex flex-col items-center shrink-0 mx-auto md:mx-0">
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={{ width: size, height: size }}
        className="transform -rotate-90"
      >
        {!hasAnySpending ? (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className="stroke-gray-200 dark:stroke-gray-700 transition-colors"
            strokeWidth={strokeWidth}
          />
        ) : (
          segments.map((seg) => (
            <circle
              key={seg.category}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={seg.dasharray}
              strokeDashoffset={seg.dashoffset}
              className="cursor-pointer transition-opacity hover:opacity-80"
            >
              <title>{seg.category}</title>
            </circle>
          ))
        )}
      </svg>
    </div>
  );
}

export default CategoryDonutChart;