import React, { useEffect } from "react";
import { getRejectedTokens } from "../../store/actions/tokenActions";
import ReactTableControlledPagination from "../utils/reactTable/ReactTableControlledPagination";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

const RejectedTokens = () => {
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: "Token No",
        accessor: "tokenNo",
      },
      {
        Header: "Vehicle Reg No",
        accessor: "vehicleRegNo",
      },
      {
        Header: "Fuel In Ltrs",
        accessor: "fuelInLtrs",
      },
      {
        Header: "Fuel Type",
        accessor: "fuelType",
      },
      {
        Header: "Created On",
        accessor: "createdOn",
      },
    ],
    []
  );

  const data = useSelector(
    (state) =>
      state.token.rejectedTokenList && state.token.rejectedTokenList.list
  ) || [
    {
      tokenNo: "",
      vehicleRegNo: "",
      fuelInLtrs: "",
      fuelType: "",
      createdOn: "",
    },
  ];
  const pageCount = useSelector(
    (state) =>
      state.token.rejectedTokenList && state.token.rejectedTokenList.TotalPages
  );
  const loading = useSelector((state) => state.token.getRejectedTokenLoading);
  const getRejectedTokenError = useSelector(
    (state) => state.token.getRejectedTokenError
  );
  // const [data, setData] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  // const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      dispatch(getRejectedTokens(pageIndex + 1, pageSize));
    },
    [dispatch]
  );

  useEffect(() => {
    if (getRejectedTokenError) {
      NotificationManager.error(getRejectedTokenError, "Error", 3000);
    }
  }, [getRejectedTokenError]);

  return (
    <div
      className='tab-pane fade'
      id='rejectedTokens'
      role='tabpanel'
      aria-labelledby='Fuel Type'
    >
      <ReactTableControlledPagination
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </div>
  );
};

export default RejectedTokens;
