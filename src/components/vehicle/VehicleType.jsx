import React from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "../utils/CustomTable";
import { CustomTableStyles } from "../../utils/styles/CommonStyles";

const VehicleType = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "vehicleTypeId",
      },
      {
        Header: "VEHICLE TYPE",
        accessor: "vehicleType",
      },
    ],
    []
  );

  const vehicleTypeList = useSelector(
    (state) => state.vehicle.vehicleTypeList
  ) || [
    {
      vehicleTypeId: "",
      vehicleType: "",
    },
  ];
  const getVehicleTypeLoading = useSelector(
    (state) => state.vehicle.getVehicleTypeLoading
  );

  return (
    <div
      className='tab-pane fade'
      id='vehicleType'
      role='tabpanel'
      aria-labelledby='Vehicle Type'
    >
      <div className='card'>
        <div className='card-header'>
          <div className='card-title'>Vehicle Type List</div>
        </div>
        <div className='card-body'>
          <CustomTableStyles>
            <CustomTable
              columns={columns}
              allData={vehicleTypeList}
              loading={getVehicleTypeLoading}
            />
          </CustomTableStyles>
        </div>
        <div className='card-footer'></div>
      </div>
    </div>
  );
};

export default VehicleType;
