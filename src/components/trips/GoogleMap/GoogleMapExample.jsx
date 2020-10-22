import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTripDistance } from "../../../store/actions/TripAction";
import { MemorisedDirectionRenderer, MemorisedDirectionService } from "./MemorisedDirectionService";

// Map container size details
const containerStyle = {
  width: "100%",
  height: "70vh",
};

// Default center point
const center = {
  lat: 26.1800165,
  lng: 91.7444111,
};

const GoogleMapExample = () => {

  const dispatch = useDispatch();

  // variable to store map object
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // console.log(map);
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // setMap(map);
  }, []);

  const markerOnLoad = React.useCallback(function callback(marker) {
    // console.log(marker);
  }, []);

  // set map object to null on unmount
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const options = {
    // any map specific option eg styles, ui show hidden etc
  };

  // Get selected locations from redux state
  const fromLocation = useSelector((state) => state.trip.latLngFrom);
  const toLocation = useSelector((state) => state.trip.latLngTo);

  // Variable to store direction service request direction
  const [directionObject, setDirectionObject] = useState();
  // Variable to store direction renderer direction
  // const [finalDirection, setFinalDirection] = useState();

  // Variable to store direction service request direction
  const [response, setResponse] = useState();

  // Listen for any changes in redux store and set direction object for DirectionService
  useEffect(() => {
    // console.log(fromLocation, " ", toLocation);
    setDirectionObject({
      destination: toLocation,
      origin: fromLocation,
      travelMode: "DRIVING",
    });
  }, [fromLocation, toLocation]);

  const setDestinationResponse = React.useCallback((res) => {
    dispatch(setTripDistance(res.routes[0].legs[0].distance.value));
    // Use this distance to calculate the fuel
    setResponse(res);
  },[dispatch]);


  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={fromLocation || center}
      zoom={fromLocation ? 14 : 10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {
        // Show the default marker if no location selected else show fromLocation
      }
      {!toLocation && (
        <Marker position={fromLocation || center} onLoad={markerOnLoad} />
      )}

      {fromLocation && toLocation && (
        <Fragment>
          <MemorisedDirectionService
            directionObject={directionObject}
            setResponse={setDestinationResponse}
          />
          {
            // If response found then show the direction renderer
          }
          response && (
            <MemorisedDirectionRenderer response={response}/>
          )
        </Fragment>
      )}
    </GoogleMap>
  );
};

export default GoogleMapExample;
