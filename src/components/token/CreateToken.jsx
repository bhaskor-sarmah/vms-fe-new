import React from "react";
import CreateTokenForm from "./CreateTokenForm";
import TokensPendingApproval from "./TokensPendingApproval";

const CreateToken = () => {
  // {
  //     vehicleRegNo: "",
  //     fuelInLtrs: "",
  //     driverId: "",
  //     assignedTo: "",
  //     purpose: ""
  // }

  return (
    <div
      className='tab-pane fade show active'
      id='createToken'
      role='tabpanel'
      aria-labelledby='Fuel Type'
    >
      <div className='row' style={{ paddingTop: "10px" }}>
        <div className='col-12 col-md-5'>
          <CreateTokenForm />
        </div>
        <div className='col-12 col-md-7'>
          <TokensPendingApproval />
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
