import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLatLngFrom, setLatLngTo } from "../../../store/actions/TripAction";

let autoCompleteFrom;
let autoCompleteTo;

const handleScriptLoad = (
  updateQueryFrom,
  updateQueryTo,
  autoCompleteFromRef,
  autoCompleteToRef,
  dispatch
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
    handlePlaceSelect(updateQueryFrom, autoCompleteFrom, "FROM", dispatch)
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
    handlePlaceSelect(updateQueryTo, autoCompleteTo, "TO", dispatch)
  );
};

// get the selected places and extract Lat Lng from it
const handlePlaceSelect = async (
  updateQuery,
  autoComplete,
  source,
  dispatch
) => {
  const addressObject = autoComplete.getPlace();

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

const TripSourceDest = () => {
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
        dispatch
      );
    }
  }, [dispatch]);

  return (
    <Fragment>
      <div className="form-group row">
        <label htmlFor="fuelInLtrs" className="col-sm-4 col-form-label">
          Select Trip From
        </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            ref={autoCompleteFromRef}
            onChange={(event) => setQueryFrom(event.target.value)}
            placeholder="Select Source Address"
            value={queryFrom}
          />
          {/* {errors.fuelInLtrs && errors.fuelInLtrs.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please enter Fuel in Ltrs
                  </span>
                )}
                {errors.fuelInLtrs && errors.fuelInLtrs.type === "min" && (
                  <span role='alert' className='text-danger'>
                    Fuel in Ltrs cannot be less than 0.
                  </span>
                )} */}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="fuelInLtrs" className="col-sm-4 col-form-label">
          Select Trip To
        </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            ref={autoCompleteToRef}
            onChange={(event) => setQueryTo(event.target.value)}
            placeholder="Select Destination Address"
            value={queryTo}
          />
          {/* {errors.fuelInLtrs && errors.fuelInLtrs.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please enter Fuel in Ltrs
                  </span>
                )}
                {errors.fuelInLtrs && errors.fuelInLtrs.type === "min" && (
                  <span role='alert' className='text-danger'>
                    Fuel in Ltrs cannot be less than 0.
                  </span>
                )} */}
        </div>
      </div>
    </Fragment>
  );
};

export default TripSourceDest;
