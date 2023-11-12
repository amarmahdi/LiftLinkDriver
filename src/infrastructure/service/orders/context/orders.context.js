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
      const orderD = await orderData.data.getUnconfirmedOrders;
      const orders = orderD.map((order) => {
        const orderObj = order.order[0];
        order = { ...order, order: orderObj };
        return order;
      });
      setOrders(orders);
      setError(null);
    } catch (err) {
      console.log("error##########", err.message);
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const onRemoveOrder = async (orderId) => {
    const newOrders = orders.filter((order) => {
      return order.order.orderId !== orderId;
    });
    setOrders(newOrders);
  };

  useEffect(() => {
    console.log("order data", orders);
  }, [orders]);

  useEffect(() => {
    if (assignedOrderSubscription) {
      const order = assignedOrderSubscription.orderAssigned.order[0];
      const orderObj = { ...assignedOrderSubscription.orderAssigned, order };
      setOrders([orderObj, ...orders]);
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
