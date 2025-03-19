import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: { width: string }[];
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = [],
  className = ""
}) => {
  // Default column configuration if not provided
  const defaultColumns = [
    { width: 'w-16' },  // ID
    { width: 'w-32' },  // Title with thumbnail
    { width: 'w-24' },  // Preview
    { width: 'w-20' },  // Slug
    { width: 'w-20' },  // Category
    { width: 'w-16' },  // Status
    { width: 'w-16' },  // Tags
    { width: 'w-20' },  // Modified By
    { width: 'w-20' },  // Last Modified
    { width: 'w-6' },   // Version
    { width: 'w-16' },  // Actions
  ];

  const colWidths = columns.length > 0 ? columns : defaultColumns;

  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <tr key={index} className={className}>
          {colWidths.map((col, colIndex) => {
            if (colIndex === 1) {
              // Special case for title column with thumbnail
              return (
                <td key={colIndex}>
                  <div className="flex flex-col gap-2">
                    <div className={`h-4 bg-base-300 rounded animate-pulse ${col.width}`}></div>
                    <div className="h-8 bg-base-300 rounded animate-pulse w-8"></div>
                  </div>
                </td>
              );
            } else if (colIndex === colWidths.length - 1) {
              // Special case for actions column
              return (
                <td key={colIndex}>
                  <div className="flex gap-2">
                    <div className="h-8 bg-base-300 rounded animate-pulse w-8"></div>
                    <div className="h-8 bg-base-300 rounded animate-pulse w-8"></div>
                  </div>
                </td>
              );
            } else if (colIndex === 5) {
              // Special case for status badge
              return (
                <td key={colIndex}>
                  <div className={`h-6 bg-base-300 rounded animate-pulse ${col.width}`}></div>
                </td>
              );
            } else {
              return (
                <td key={colIndex}>
                  <div className={`h-4 bg-base-300 rounded animate-pulse ${col.width}`}></div>
                </td>
              );
            }
          })}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
