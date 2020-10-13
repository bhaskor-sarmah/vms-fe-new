import React, { useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { resetNotification } from "../../store/actions/globalDispatch";
import {
  getApprovalPendingTokens,
  restTokenApproveMessage,
  restTokenErrorMessage,
} from "../../store/actions/tokenActions";
import { TOKEN_APPROVE_MESSAGE } from "../../store/actions/types";
import TokenDetails from "./TokenDetails";

const TokensPendingApproval = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.token.getPendingTokenLoading);
  const pendingTokenList = useSelector((state) => state.token.pendingTokenList);
  const getPendingTokenError = useSelector(
    (state) => state.token.getPendingTokenError
  );
  const tokenApproveLoading = useSelector(
    (state) => state.token.tokenApproveLoading
  );

  useEffect(() => {
    dispatch(getApprovalPendingTokens());
  }, [dispatch]);

  useEffect(() => {
    if (getPendingTokenError) {
      NotificationManager.error(getPendingTokenError, "Error", 3000);
    }
  }, [getPendingTokenError]);

  const tokenApproveMessage = useSelector(
    (state) => state.token.tokenApproveMessage
  );
  const tokenApproveError = useSelector(
    (state) => state.token.tokenApproveError
  );

  useEffect(() => {
    if (tokenApproveMessage) {
      NotificationManager.success(tokenApproveMessage, "Success", 3000);
      dispatch(restTokenApproveMessage());
      dispatch(getApprovalPendingTokens());
    }
  }, [dispatch, tokenApproveMessage]);

  useEffect(() => {
    if (tokenApproveError) {
      NotificationManager.error(tokenApproveError, "Error", 3000);
      dispatch(restTokenErrorMessage());
    }
  }, [dispatch, tokenApproveError]);

  return (
    <div className='card' style={{ height: "436px", overflowX: "hidden" }}>
      <div className='card-header'>
        <h3 className='card-title'>Generated Tokens</h3>
      </div>
      <div className='card-body'>
        {loading || tokenApproveLoading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : pendingTokenList.length === 0 ? (
          <div>
            <h3>No Token Found</h3>
          </div>
        ) : (
          pendingTokenList.map((token) => (
            <TokenDetails key={token.id} token={token} />
          ))
        )}
      </div>
    </div>
  );
};

export default TokensPendingApproval;
