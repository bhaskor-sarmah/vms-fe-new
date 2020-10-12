import React, { Fragment } from "react";

// Simple custom table implementation by me
export const CustomTable = ({
  columns,
  allData,
  loading,
  // loading,
  // pageCount: controlledPageCount,
}) => {
  return loading ? (
    // Use our custom loading state to show a loading indicator
    <h3>Loading...</h3>
  ) : (
    // If not loading show the table
    <Fragment>
      <table>
        <thead>
          <tr>
            {columns.map((column, i) => {
              return <th key={i}>{column.Header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.map((data, dataIndex) => (
              <tr key={dataIndex}>
                {columns.map(
                  (column, columnIndex) =>
                    data[column.accessor] !== undefined && (
                      <td key={columnIndex + "" + dataIndex}>
                        {data[column.accessor]}
                      </td>
                    )
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};
