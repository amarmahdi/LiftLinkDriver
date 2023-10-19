import React, { createContext, useEffect, useState, useContext } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CONFIRM_ORDER, REJECT_ORDER } from "../../mutation";
import { GET_CONFIRMED_ORDERS, GET_STARTED_VALET } from "../../query";
import { ValetContext } from "../../valet/context/valet.context";

export const OrderConfirmationContext = createContext();

export const OrderConfirmationProvider = ({ children }) => {
  const [confirmOrder, { loading: confirmOrderLoading }] =
    useMutation(CONFIRM_ORDER);
  const [declineOrder, { loading: declineOrderLoading }] =
    useMutation(REJECT_ORDER);
  const [getConfrmedOrders, { refetch }] = useLazyQuery(GET_CONFIRMED_ORDERS);
  const [order, setOrder] = useState(null);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 3,
  });
  const [error, setError] = useState(null);
  const { setselectedValet } = useContext(ValetContext);

  const onConfirmOrder = async (assignId) => {
    setLoading(true);
    try {
      const { data } = await confirmOrder({
        variables: { assignId },
      });
      setOrder(data.confirmOrder);
      setLoading(confirmOrderLoading);
      return data;
    } catch (error) {
      console.log("error", error.message);
      setError(error.message);
      return;
    }
  };

  const onDeclineOrder = async (assignId) => {
    setLoading(true);
    try {
      const { data } = await declineOrder({
        variables: { assignId },
      });
      setOrder(data.declineOrder);
      setLoading(declineOrderLoading);
      return data;
    } catch (error) {
      console.log("error", error.message);
      setError(error.message);
      return;
    }
  };

  const onGetConfirmedOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await getConfrmedOrders({
        variables: {
          ...pagination,
        },
      });
      if (data) {
        console.log("data", data);
        if (confirmedOrders.length > 0)
          setConfirmedOrders((prev) => {
            let newOrders = [];
            data.getConfirmedOrders.forEach((newOrder) => {
              if (!prev.some((order) => order.assignId === newOrder.assignId)) {
                newOrders.push(newOrder);
              }
            });
            return [...prev, ...newOrders];
          });
        else setConfirmedOrders(data.getConfirmedOrders);
        setLoading(false);
        return;
      }
      if (error) {
        console.log("error", error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      console.log("error", error.message);
      setError(error.message);
      setLoading(false);
      return;
    }
  };

  const onRefresh = async () => {
    // setPagination({
    //   page: 1,
    //   perPage: 10,
    // });
    await refetch({
      page: 1,
      perPage: 10,
    }).then(({ data: { getConfirmedOrders } }) => {
      setConfirmedOrders(getConfirmedOrders);
    });
  };

  useEffect(() => {
    if (error) {
      console.log("error", error.message);
      setError(error.message);
    }
  }, [error]);

  const incrementPage = () => {
    setPagination({
      page: pagination.page + 1,
      perPage: pagination.perPage,
    });
  };

  const removeOrder = (assignId) => {
    const newOrders = confirmedOrders.filter(
      (order) => order.assignId !== assignId
    );
    setConfirmedOrders(newOrders);
  };

  return (
    <OrderConfirmationContext.Provider
      value={{
        order,
        selectedOrder,
        setSelectedOrder,
        onConfirmOrder,
        onDeclineOrder,
        onGetConfirmedOrders,
        confirmedOrders,
        loading,
        removeOrder,
        incrementPage,
        error,
        onRefresh,
      }}
    >
      {children}
    </OrderConfirmationContext.Provider>
  );
};
