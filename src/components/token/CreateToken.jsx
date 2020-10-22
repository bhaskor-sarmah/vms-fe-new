import React from "react";
import CreateTokenForm from "./CreateTokenForm";
import TokensPendingApproval from "./TokensPendingApproval";

const CreateToken = () => {
  // <input
  //       type="text"
  //       id="name"
  //       aria-invalid={errors.name ? "true" : "false"}
  //       ref={register({ required: true, maxLength: 30 })}
  //     />

  //     {/* use role="alert" to announce the error message */}
  //     {errors.name && errors.name.type === "required" && (
  //       <span role="alert">This is required</span>
  //     )}
  //     {errors.name && errors.name.type === "maxLength" && (
  //       <span role="alert">Max length exceeded</span>
  //     )}

  return (
    <div
      className='tab-pane fade show active'
      id='createToken'
      role='tabpanel'
      aria-labelledby='Create Token'
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
