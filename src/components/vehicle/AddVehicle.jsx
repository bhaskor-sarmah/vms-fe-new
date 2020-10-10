import React from "react";

// This page is done using old react lifecycle
// hooks and doesnot implements react V16+ hooks
const AddVehicle = () => {
  // {
  //   "vehicleRegistrationNo":"AS124657",
  //   "categoryId":"2",
  //   "fuelType":1,
  //   "vehicleTypeId":"2",
  //   "ownerMobileNumber":"1234567890",
  //   "modelName":"ACB",
  //   "milage":23.5
  // }
  return (
    <div
      className='tab-pane fade'
      id='addVehicle'
      role='tabpanel'
      aria-labelledby='Add Vehicle'
    >
      Add Vehicle Tab
    </div>
  );
};
export default AddVehicle;
