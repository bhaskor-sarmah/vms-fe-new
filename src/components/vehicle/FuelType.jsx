import React from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "../utils/CustomTable";
import { CustomTableStyles } from "../../utils/styles/CommonStyles";

const FuelType = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "FUEL TYPE",
        accessor: "type",
      },
    ],
    []
  );

  const vehicleFuelTypeList = useSelector(
    (state) => state.vehicle.vehicleFuelTypeList
  ) || [
    {
      id: "",
      type: "",
    },
  ];
  const getVehicleFuelTypeLoading = useSelector(
    (state) => state.vehicle.getVehicleFuelTypeLoading
  );

  return (
    <div
      className='tab-pane fade'
      id='fuelType'
      role='tabpanel'
      aria-labelledby='Fuel Type'
    >
      <CustomTableStyles>
        <CustomTable
          columns={columns}
          allData={vehicleFuelTypeList}
          loading={getVehicleFuelTypeLoading}
        />
      </CustomTableStyles>
    </div>
  );
};

export default FuelType;
