import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedTokens } from "../../store/actions/tokenActions";
import { NotificationManager } from "react-notifications";
import ReactTableControlledPagination from "../utils/reactTable/ReactTableControlledPagination";

const ApprovedTokens = () => {
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
      state.token.approvedTokenList && state.token.approvedTokenList.list
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
      state.token.approvedTokenList && state.token.approvedTokenList.TotalPages
  );
  const loading = useSelector((state) => state.token.getApprovedTokenLoading);
  const getApprovedTokenError = useSelector(
    (state) => state.token.getApprovedTokenError
  );

  // const [data, setData] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  // const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      dispatch(getApprovedTokens(pageIndex + 1, pageSize));
    },
    [dispatch]
  );

  useEffect(() => {
    if (getApprovedTokenError) {
      NotificationManager.error(
        "Error fetching Approved Token List !",
        "Error",
        3000
      );
    }
  }, [getApprovedTokenError]);

  return (
    <div
      className='tab-pane fade'
      id='approvedTokens'
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

export default ApprovedTokens;
