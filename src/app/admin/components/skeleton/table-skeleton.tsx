import React from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = "",
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-lg ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          {showHeader && (
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                {Array(columns)
                  .fill(null)
                  .map((_, idx) => (
                    <th key={idx} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </th>
                  ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white divide-y">
            {Array(rows)
              .fill(null)
              .map((_, rowIdx) => (
                <tr key={rowIdx} className="text-gray-700">
                  {Array(columns)
                    .fill(null)
                    .map((_, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
