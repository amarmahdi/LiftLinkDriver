import React, { createContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_ORDERS } from "../../query";
import { GET_ASSIGNED_ORDERS } from "../../subscription";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [getOrders, { data, loading, error: err, refetch }] =
    useLazyQuery(GET_ORDERS);
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { data: assignedOrderSubscription } =
    useSubscription(GET_ASSIGNED_ORDERS);

  const getAllOrders = async () => {
    setRefreshing(true);
    await getOrders()
      .then(({ data: { getUnconfirmedOrders } }) => {
        setOrders(getUnconfirmedOrders);
      })
      .catch((err) => {
        console.log("error", err.message);
        setError(err.message);
      });
    setRefreshing(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (err) {
      console.log("error", err.message);
      setError(err.message);
    }
  }, [err]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch()
      .then(({ data: { getUnconfirmedOrders } }) => {
        setOrders(getUnconfirmedOrders);
      })
      .catch((err) => {
        console.log("error", err.message);
        setError(err.message);
      });
    setRefreshing(false);
  };

  useEffect(() => {
    if (assignedOrderSubscription) {
      console.log("assignedOrderSubscription####", assignedOrderSubscription.orderAssigned);
      setOrders([
        assignedOrderSubscription.orderAssigned,
        ...orders,
      ]);
    }
  }, [assignedOrderSubscription]);

  return (
    <OrdersContext.Provider
      value={{
        getOrders,
        data,
        loading,
        error,
        orders,
        setOrders,
        refreshing,
        getAllOrders,
        onRefresh,
        error,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
