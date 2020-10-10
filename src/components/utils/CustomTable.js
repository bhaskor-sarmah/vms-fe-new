import React from "react";

export const CustomTable = ({
  columns,
  allData,
  fetchData,
  loading,
  // loading,
  // pageCount: controlledPageCount,
}) => {
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData();
    // This is a initial fetch, we can provide page no
    // as dependent variable to fetch on page change
  }, [fetchData]);
  console.log(columns);
  console.log(allData);
  // console.log(loading);
  // Render the UI for your table
  return loading ? (
    // Use our custom loading state to show a loading indicator
    <h3>Loading...</h3>
  ) : (
    // If not loading show the table
    <>
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
    </>
  );
};
