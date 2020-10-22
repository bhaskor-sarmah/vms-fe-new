import React from "react";

const PendingTrip = () => {
  return (
    <div
      className='tab-pane fade'
      id='pendingTrip'
      role='tabpanel'
      aria-labelledby='Pending Trip'
    >
      <div className='card'>
        <div className='card-header'>Pending For Approval Trips</div>
        <div className='card-body'>Pending Trip</div>
        <div className='card-footer'></div>
      </div>
    </div>
  );
};

export default PendingTrip;
