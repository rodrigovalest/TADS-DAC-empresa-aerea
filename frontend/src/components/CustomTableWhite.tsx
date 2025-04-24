import React, { useState, useMemo } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

export interface Column<T> {
  header: string;
  accessor: keyof T | string; // Identificador do dado na linha
  sortable?: boolean; // Indica se a coluna pode ser ordenada
  renderCell?: (row: T) => React.ReactNode; // Renderização customizada da célula
}

interface CustomTableWhiteProps<T> {
  columns: Column<T>[];
  data: T[];
  showHeader?: boolean; // novo prop para mostrar ou não os headers
  hideSortButtons?: boolean; // novo prop para ocultar os ícones de ordenação
}

const CustomTableWhite = <T extends Record<string, any>>({
  columns,
  data,
  showHeader = true,
  hideSortButtons = false,
}: CustomTableWhiteProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (column: Column<T>) => {
    if (hideSortButtons) return; // desabilita a ordenação se hideSortButtons estiver true
    if (!column.sortable) return;
    const key = column.accessor as string;
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        setSortConfig({ key, direction: "desc" });
      } else if (sortConfig.direction === "desc") {
        setSortConfig(null);
      }
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 overflow-hidden px-6 py-10 bg-white">
      <table className="min-w-full bg-white">
        <thead className="bg-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                onClick={!hideSortButtons ? () => handleSort(col) : undefined} // remove onClick se desabilitado
                className={`p-4 border-b border-gray-800 text-xl ${
                  col.sortable && !hideSortButtons
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
              >
                <div
                  className="flex items-center justify-center gap-1"
                  onClick={!hideSortButtons ? () => handleSort(col) : undefined} // remove onClick se desabilitado
                >
                  {showHeader ? (
                    <>
                      {col.header}
                      {!hideSortButtons && (
                        <span
                          className={`transition-opacity duration-200 ${
                            col.sortable &&
                            sortConfig &&
                            sortConfig.key === col.accessor
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          {sortConfig?.key === col.accessor
                            ? sortConfig.direction === "asc"
                              ? "▲"
                              : "▼"
                            : "▲"}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {!hideSortButtons && col.sortable && (
                        <span
                          className={`flex items-center justify-center transition-opacity duration-200 text-base ${
                            sortConfig?.key === col.accessor
                              ? "opacity-100"
                              : "opacity-50"
                          }`}
                        >
                          {sortConfig?.key === col.accessor ? (
                            sortConfig.direction === "asc" ? (
                              "▲"
                            ) : (
                              "▼"
                            )
                          ) : (
                            <FilterListIcon />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                className="p-4 border-b border-gray-800 text-xl"
                colSpan={columns.length}
              >
                Esta tabela não tem nenhum item
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 border-b border-gray-800 text-xl"
                  >
                    {col.renderCell
                      ? col.renderCell(row)
                      : row[col.accessor as string]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTableWhite;
