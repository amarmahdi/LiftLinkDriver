import React, { createContext, useEffect, useState } from "react";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { GET_ORDERS } from "../../query";
import { GET_ASSIGNED_ORDERS } from "../../subscription";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  // const [getOrders, { data, loading, error: err }] = useLazyQuery(GET_ORDERS);
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { data: assignedOrderSubscription } =
    useSubscription(GET_ASSIGNED_ORDERS);
  const orderData = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });

  const getAllOrders = async () => {
    setOrders([]);
    console.log("get all orders");
    try {
      setRefreshing(true);
      await orderData.refetch();    
      setOrders(await orderData.data.getUnconfirmedOrders);
      setError(null);
    } catch (err) {
      console.log("error##########", err.message);
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setOrders([]);
    getAllOrders();
  }, []);

  useEffect(() => {
    if (orderData.loading) {
      setRefreshing(true);
      console.log("loading");
    }
    if (!orderData.loading) {
      setRefreshing(false);
      console.log("not loading");
    }
  }, [orderData.loading]);

  useEffect(() => {
    if (orderData.error) {
      console.log("orderData.error", orderData.error);
      setError(orderData.error.message);
      setRefreshing(false);
      1;
    }
  }, [orderData.error]);

  // useEffect(() => {
  //   if (err) {
  //     console.log("error", err.message);
  //     setError(err.message);
  //   }
  // }, [err]);

  const onRemoveOrder = async (orderId) => {
    const newOrders = orders.filter((order) => {
      return order.order.orderId !== orderId;
    });
    setOrders(newOrders);
  };

  useEffect(() => {
    if (assignedOrderSubscription) {
      setOrders([assignedOrderSubscription.orderAssigned, ...orders]);
    }
  }, [assignedOrderSubscription]);

  return (
    <OrdersContext.Provider
      value={{
        // data,
        // loading,
        error,
        orders,
        setOrders,
        refreshing,
        getAllOrders,
        error,
        setError,
        onRemoveOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
