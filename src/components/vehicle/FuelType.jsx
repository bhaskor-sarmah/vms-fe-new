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
      id='fuelTypeId'
      role='tabpanel'
      aria-labelledby='Fuel Type'
    >
      <div className='card'>
        <div className='card-header'>
          <div className='card-title'>Fuel Type List</div>
        </div>
        <div className='card-body'>
          <CustomTableStyles>
            <CustomTable
              columns={columns}
              allData={vehicleFuelTypeList}
              loading={getVehicleFuelTypeLoading}
            />
          </CustomTableStyles>
        </div>
        <div className='card-footer'></div>
      </div>
    </div>
  );
};

export default FuelType;
