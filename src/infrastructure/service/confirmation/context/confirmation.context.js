import React, { createContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_REQUESTS } from "../../query";
import { ACCEPT_REQUEST, REJECT_REQUEST } from "../../mutation";
import { GET_DEALERSHIP_REQUESTS } from "../../subscription";

export const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [getRequests, { data, loading, error, refetch }] = useLazyQuery(
    GET_REQUESTS
  );
  const { data: { notifyDriver } = {} } = useSubscription(
    GET_DEALERSHIP_REQUESTS
  );
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [rejectRequest] = useMutation(REJECT_REQUEST);
  const [confirmation, setConfirmation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch().then(({ data: { getRequests } }) => {
      setConfirmation(getRequests);
    });
    setRefreshing(false);
  };

  // const onRequestRecieved = async (data) => {
  //   if (notifyDriver)
  // };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <ConfirmationContext.Provider
      value={{
        getRequests,
        data,
        loading,
        error,
        confirmation,
        setConfirmation,
        acceptRequest,
        rejectRequest,
        refreshing,
        onRefresh,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
};