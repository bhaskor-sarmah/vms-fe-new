import React, { useEffect } from "react";
import { CustomTable } from "../utils/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { TableStyles } from "../../utils/styles/CommonStyles";
import { getAllVehicles } from "../../store/actions/vehicleActions";

const AllVehicle = () => {
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "REGISTRATION NO",
        accessor: "regNo",
      },
      {
        Header: "CATEGORY",
        accessor: "categoryName",
      },
      {
        Header: "VEHICLE TYPE",
        accessor: "type",
      },
      {
        Header: "FUEL TYPE",
        accessor: "fuelType",
      },
      {
        Header: "MODEL",
        accessor: "modelName",
      },

      {
        Header: "MILAGE",
        accessor: "mileage",
      },
    ],
    []
  );

  const vehicleList = useSelector((state) => state.vehicle.vehicleList);
  const vehicleLoading = useSelector((state) => state.vehicle.vehicleLoading);
  const fetchData = React.useCallback(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  return (
    <div
      className='tab-pane fade show active'
      id='allVehicle'
      role='tabpanel'
      aria-labelledby='All Vehicle'
    >
      <TableStyles>
        <CustomTable
          columns={columns}
          allData={vehicleList}
          fetchData={fetchData}
          loading={vehicleLoading}
          // pageCount={pageCount}
        />
      </TableStyles>
    </div>
  );
};

export default AllVehicle;
