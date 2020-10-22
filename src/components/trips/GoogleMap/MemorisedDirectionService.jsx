import React from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import _ from "underscore";

const DirectionServiceView = ({ directionObject, setResponse }) => {
  return (
    <DirectionsService
      // Start the direction service if fromLocation & toLocation found
      options={directionObject}
      // Set the response after getting from direction service
      callback={(response) => setResponse(response)}
      onLoad={(directionsService) => {
        // console.log(
        //   "DirectionsService onLoad directionsService: ",
        //   directionsService
        // );
      }}
      onUnmount={(directionsService) => {
        // console.log(
        //   "DirectionsService onUnmount directionsService: ",
        //   directionsService
        // );
      }}
    />
  );
};

export const MemorisedDirectionService = React.memo(DirectionServiceView);


const DirectionRendererView = ({ response }) => {
  return (
    <DirectionsRenderer
      options={{
        directions: response,
      }}
      onLoad={(directionsRenderer) => {
        // console.log(
        //   "DirectionsRenderer onLoad directionsRenderer: ",
        //   directionsRenderer
        // );
      }}
      onUnmount={(directionsRenderer) => {
        // console.log(
        //   "DirectionsRenderer onUnmount directionsRenderer: ",
        //   directionsRenderer
        // );
      }}
    />
  );
};

export const MemorisedDirectionRenderer = React.memo(DirectionRendererView);
