import React from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "../utils/CustomTable";
import { CustomTableStyles } from "../../utils/styles/CommonStyles";

const VehicleCategory = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "CATEGORY NAME",
        accessor: "catogoryName",
      },
    ],
    []
  );

  const vehicleCategoryList = useSelector(
    (state) => state.vehicle.vehicleCategoryList
  ) || [
    {
      id: "",
      catogoryName: "",
    },
  ];
  const getVehicleCategoryLoading = useSelector(
    (state) => state.vehicle.getVehicleCategoryLoading
  );

  return (
    <div
      className='tab-pane fade'
      id='vehicleCategories'
      role='tabpanel'
      aria-labelledby='Vehicle Categories'
    >
      <div className='card'>
        <div className='card-header'>
          <div className='card-title'>Vehicle Category List</div>
        </div>
        <div className='card-body'>
          <CustomTableStyles>
            <CustomTable
              columns={columns}
              allData={vehicleCategoryList}
              loading={getVehicleCategoryLoading}
            />
          </CustomTableStyles>
        </div>
        <div className='card-footer'></div>
      </div>
    </div>
  );
};

export default VehicleCategory;
