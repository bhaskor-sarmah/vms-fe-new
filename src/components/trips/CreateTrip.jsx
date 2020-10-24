import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleMapExample } from "./GoogleMap";
import { LoadScript } from "@react-google-maps/api";
import CreateTripForm from "./CreateTripForm";
import { getAllVehicles } from "../../store/actions/vehicleActions";
import { getAllDrivers } from "../../store/actions/driverActions";
import { resetGeneratedToken } from "../../store/actions/TripAction";
import { resetNotification } from "../../store/actions/globalDispatch";

// These libraries are required by google autocomplete
const libraries = ["places", "geometry"];

const CreateTrip = () => {
  // const from = useSelector((state) => state.trip.latLngFrom);
  // const to = useSelector((state) => state.trip.latLngTo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(resetGeneratedToken());
    dispatch(resetNotification());
  }, [dispatch]);

  return (
    <div
      className="tab-pane fade show active"
      id="createTrip"
      role="tabpanel"
      aria-labelledby="Fuel Type"
    >
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        libraries={libraries}
      >
        <div className="card">
          <div className="card-header">Create New Trip</div>
          <div className="card-body">
            <div className="row" style={{ paddingTop: "10px" }}>
              <div className="col-12 col-md-5">
                <CreateTripForm />
              </div>
              <div className="col-12 col-md-7">
                <GoogleMapExample />
              </div>
            </div>
          </div>
          <div className="card-footer"></div>
        </div>
      </LoadScript>
    </div>
  );
};

export default CreateTrip;
