import React, { useEffect } from "react";
import { CustomTable } from "../utils/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../store/actions/driverActions";
import { TableStyles } from "../../utils/styles/CommonStyles";

const AllDrivers = () => {
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "MOBILE NO",
        accessor: "mobile",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "DRIVER LICENCE NO",
        accessor: "drivingLicenceNo",
      },

      {
        Header: "USERNAME",
        accessor: "username",
      },
    ],
    []
  );

  const driverState = useSelector((state) => state.driver);

  const fetchData = React.useCallback(() => {
    console.log("fired fetchData");
    // return dispatch(getAllDrivers());
    dispatch(getAllDrivers());
  }, [dispatch]);

  return (
    <div
      className='tab-pane fade'
      id='allDriver'
      role='tabpanel'
      aria-labelledby='All Driver'
    >
      <TableStyles>
        <CustomTable
          columns={columns}
          allData={driverState.driverList}
          fetchData={fetchData}
          loading={driverState.driverLoading}
          // pageCount={pageCount}
        />
      </TableStyles>
    </div>
  );
};

export default AllDrivers;
