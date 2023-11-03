import React, { createContext, useEffect, useState } from "react";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { GET_REQUESTS } from "../../query";
import { ACCEPT_REQUEST, REJECT_REQUEST } from "../../mutation";
import { GET_DEALERSHIP_REQUESTS } from "../../subscription";

export const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const getRequests = useQuery(GET_REQUESTS, {
    fetchPolicy: "network-only",
  });
  const { data: { notifyDriver } = {} } = useSubscription(
    GET_DEALERSHIP_REQUESTS
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [rejectRequest] = useMutation(REJECT_REQUEST);
  const [confirmation, setConfirmation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setConfirmation(null);
    setError(null);
    setLoading(true);
    try {
      setRefreshing(true);
      const {
        data: { getConfirmation },
      } = await getRequests.refetch();
      setConfirmation(getConfirmation);
    } catch (error) {
      setError(error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  return (
    <ConfirmationContext.Provider
      value={{
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
