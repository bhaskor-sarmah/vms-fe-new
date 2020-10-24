import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import { setLatLngFrom, setLatLngTo } from "../../../store/actions/TripAction";

let autoCompleteFrom;
let autoCompleteTo;

const handleScriptLoad = (
  updateQueryFrom,
  updateQueryTo,
  autoCompleteFromRef,
  autoCompleteToRef,
  dispatch,
  parentCallBack
) => {
  // Create a autocomplete for the From Location
  autoCompleteFrom = new window.google.maps.places.Autocomplete(
    autoCompleteFromRef.current,
    { componentRestrictions: { country: "in" } }
  );
  autoCompleteFrom.setFields([
    // "address_components",
    // "place_id",
    "formatted_address",
    "geometry",
  ]);
  autoCompleteFrom.addListener("place_changed", () =>
    handlePlaceSelect(
      updateQueryFrom,
      autoCompleteFrom,
      "FROM",
      dispatch,
      parentCallBack
    )
  );

  // Create a autocomplete for the To Location
  autoCompleteTo = new window.google.maps.places.Autocomplete(
    autoCompleteToRef.current,
    { componentRestrictions: { country: "in" } }
  );
  autoCompleteTo.setFields([
    // "address_components",
    // "place_id",
    "formatted_address",
    "geometry",
  ]);
  autoCompleteTo.addListener("place_changed", () =>
    handlePlaceSelect(
      updateQueryTo,
      autoCompleteTo,
      "TO",
      dispatch,
      parentCallBack
    )
  );
};

// get the selected places and extract Lat Lng from it
const handlePlaceSelect = async (
  updateQuery,
  autoComplete,
  source,
  dispatch,
  parentCallBack
) => {
  const addressObject = autoComplete.getPlace();

  // Sending object to prent compoment alont with source
  parentCallBack(addressObject.formatted_address, source);

  // get the selected place and set it in the respective state object
  updateQuery(addressObject.formatted_address);

  // Store the From Lat Lng into the redux store
  if (source === "FROM") {
    await dispatch(
      setLatLngFrom({
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      })
    );
  }

  // Store the To Lat Lng into the redux store
  if (source === "TO") {
    await dispatch(
      setLatLngTo({
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      })
    );
  }
};

const TripSourceDest = ({ parentCallBack, errorTo, errorFrom,disableFlag}) => {
  // Get select places from autocomplete on select
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");

  // Variables to store reference
  const autoCompleteFromRef = useRef(null);
  const autoCompleteToRef = useRef(null);

  // Redux store dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    // if google map API is loaded then start autocomplete
    if (window.google) {
      handleScriptLoad(
        setQueryFrom,
        setQueryTo,
        autoCompleteFromRef,
        autoCompleteToRef,
        dispatch,
        parentCallBack
      );
    }
  }, [dispatch, parentCallBack]);

  return (
    <Fragment>
      <div className="form-group row">
        <label htmlFor="fuelInLtrs" className="col-sm-4 col-form-label">
          Select Trip From
        </label>
        <div className="col-sm-8">
          <input
            className={classnames("form-control", {
              "is-invalid": errorFrom,
            })}
            ref={autoCompleteFromRef}
            onChange={(event) => setQueryFrom(event.target.value)}
            placeholder="Select Source Address"
            value={queryFrom}
            readonly={disableFlag}
          />
          {errorFrom && (
            <span role="alert" className="text-danger">
              {errorFrom}
            </span>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="fuelInLtrs" className="col-sm-4 col-form-label">
          Select Trip To
        </label>
        <div className="col-sm-8">
          <input
            className={classnames("form-control", {
              "is-invalid": errorTo,
            })}
            ref={autoCompleteToRef}
            onChange={(event) => setQueryTo(event.target.value)}
            placeholder="Select Destination Address"
            value={queryTo}
            readonly={disableFlag}
          />
          {errorTo && (
            <span role="alert" className="text-danger">
              {errorTo}
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TripSourceDest;
