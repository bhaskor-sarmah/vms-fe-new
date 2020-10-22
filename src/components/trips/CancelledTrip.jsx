import React from "react";

const CancelledTrip = () => {
  return (
    <div
      className='tab-pane fade'
      id='cancelledTrip'
      role='tabpanel'
      aria-labelledby='Cancelled Trip'
    >
      <div className='card'>
        <div className='card-header'>Cancelled Trips</div>
        <div className='card-body'>Cancelled Trip</div>
        <div className='card-footer'></div>
      </div>
    </div>
  );
};

export default CancelledTrip;
