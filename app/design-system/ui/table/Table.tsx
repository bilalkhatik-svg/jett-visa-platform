import React from "react";

export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  selectable?: boolean;
  selectedRows?: Set<number>;
  onRowSelect?: (rowIndex: number, selected: boolean) => void;
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  className = "",
  selectable = false,
  selectedRows = new Set(),
  onRowSelect,
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* Empty header for checkbox column */}
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => {
            const isSelected = selectedRows.has(rowIndex);
            return (
              <tr
                key={rowIndex}
                className={`hover:bg-gray-50 ${
                  isSelected ? "bg-blue-50" : ""
                }`}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        onRowSelect?.(rowIndex, e.target.checked)
                      }
                      className="h-4 w-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB] focus:ring-2"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

