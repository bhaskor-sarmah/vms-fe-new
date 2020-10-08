import React from "react";
import styled from "styled-components";
import { Table } from "./AllDriverTable";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const AllDrivers = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "TRIPS",
        accessor: "trips",
      },
      {
        Header: "COUNTRY",
        accessor: "airline.country",
      },
      {
        Header: "HEAD QUATERS",
        accessor: "airline.head_quaters",
      },
      {
        Header: "ESTABLISHED",
        accessor: "airline.established",
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${pageIndex}&size=${pageSize}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (fetchId === fetchIdRef.current) {
            setData(json.data);
            setPageCount(Math.ceil(json.totalPassengers / pageSize));
            // No of pages
            setLoading(false);
          }
        });
    }
  }, []);

  return (
    <div
      className='tab-pane fade'
      id='allDriver'
      role='tabpanel'
      aria-labelledby='All Driver'
    >
      <Styles>
        <Table
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </Styles>
    </div>
  );
};

export default AllDrivers;
