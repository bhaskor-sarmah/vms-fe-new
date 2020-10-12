import React, { Fragment } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import "./tableStyles.css";

const ReactTableControlledPagination = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  title,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    // Get the state from the instance ,
    // globalFilter column.getSortByToggleProps()
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      // autoResetFilters: false,
      // autoResetSortBy: false,
      // manualFilters: true,
      // manualSortBy: true
      autoResetPage: false,
      autoResetExpanded: false,
      autoResetGroupBy: false,
      autoResetSelectedRows: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      autoResetRowState: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // React.useEffect(() => {
  // After the table has updated, always remove the flag
  //   skipPageResetRef.current = false;
  // });

  // Render the UI for your table
  let start = pageIndex - 5;
  let stop = pageIndex + 4;
  let step = 1;

  if (start < 0) {
    start = 0;
    stop = 9;
  }

  if (stop >= pageOptions.length) {
    stop = pageOptions.length - 1;
    start = pageOptions.length - 10;
  }

  if (pageOptions.length < 10) {
    start = 0;
    stop = pageOptions.length - 1;
    if (stop < 0) {
      stop = 0;
    }
  }

  return (
    <Fragment>
      {loading ? (
        // if loading
        <div className='card'>
          <div className='card-header'>
            <h3 className='card-title'>{title}</h3>
          </div>
          <div className='card-body'>
            <h3>Loading Table....</h3>
          </div>
          <div className='card-footer'></div>
        </div>
      ) : (
        // if not loading
        <div className='card'>
          <div className='card-header'>
            <div
              className='row text-center'
              style={{ textTransform: "uppercase" }}
            >
              <h4 className='col-sm-12'>{title}</h4>
            </div>
            <span className='card-title row'>
              <span className='col-sm-4 text-right pt-1'>Show </span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className='form-control col-sm-4'
                style={{ width: "80px" }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>{" "}
              <span className='col-sm-4 pt-1'>Rows</span>
            </span>
            <div className='card-tools'>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </div>
          </div>
          <div className='card-body'>
            <table {...getTableProps()} className='table table-bordered'>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span className='sorting_asc'></span>
                          ) : (
                            <span className='sorting_desc'></span>
                          )
                        ) : (
                          <span className='sorting'></span>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='card-footer clearfix'>
            <span className='float-left'>
              Showing {page.length} of ~{controlledPageCount * pageSize} results
            </span>
            <ul className='pagination pagination-sm m-0 float-right'>
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  «
                </button>
              </li>

              {Array.from(
                { length: (stop - start) / step + 1 },
                (_, key) => start + key * step
              ).map((k) => {
                return pageIndex === k ? (
                  <li className='page-item active' key={k}>
                    <button className='page-link' onClick={() => gotoPage(k)}>
                      {k + 1}
                    </button>
                  </li>
                ) : (
                  <li className='page-item' key={k}>
                    <button className='page-link' onClick={() => gotoPage(k)}>
                      {k + 1}
                    </button>
                  </li>
                );
              })}
              {/* <li className='page-item'>
                <button
                  className='page-link'
                  onClick={() => gotoPage(pageIndex + 1)}
                  disabled={!canNextPage}
                >
                  "\u003E"
                </button>
              </li> */}
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  »
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReactTableControlledPagination;
