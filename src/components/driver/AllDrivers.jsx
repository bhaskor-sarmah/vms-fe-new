import React, { useEffect } from "react";
import ReactTableWithoutControllPagination from "../utils/reactTable/ReactTableWithoutControllPagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../store/actions/driverActions";
import { NotificationManager } from "react-notifications";

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

  const driverList = useSelector((state) => state.driver.driverList) || [
    {
      id: "",
      name: "",
      mobile: "",
      email: "",
      drivingLicenceNo: "",
      username: "",
    },
  ];
  const driverLoading = useSelector((state) => state.driver.driverLoading);

  const getDriverError = useSelector((state) => state.driver.getDriverError);
  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (getDriverError) {
      NotificationManager.error(getDriverError, "Error", 3000);
    }
  }, [getDriverError]);

  return (
    <div
      className='tab-pane fade'
      id='allDriver'
      role='tabpanel'
      aria-labelledby='All Driver'
    >
      <ReactTableWithoutControllPagination
        columns={columns}
        data={driverList}
        loading={driverLoading}
      />
    </div>
  );
};

export default AllDrivers;
