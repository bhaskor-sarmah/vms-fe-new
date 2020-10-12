import React, { useEffect } from "react";
// import { CustomTable } from "../utils/CustomTable";
import ReactTableWithoutControllPagination from "../utils/reactTable/ReactTableWithoutControllPagination";
import { useDispatch, useSelector } from "react-redux";
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

  const vehicleList = useSelector((state) => state.vehicle.vehicleList) || [
    {
      id: "",
      regNo: "",
      categoryName: "",
      type: "",
      fuelType: "",
      modelName: "",
      mileage: "",
    },
  ];
  const vehicleLoading = useSelector((state) => state.vehicle.vehicleLoading);

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  return (
    <div
      className='tab-pane fade show active'
      id='allVehicle'
      role='tabpanel'
      aria-labelledby='All Vehicle'
    >
      <ReactTableWithoutControllPagination
        columns={columns}
        data={vehicleList}
        loading={vehicleLoading}
      />
    </div>
  );
};

export default AllVehicle;
