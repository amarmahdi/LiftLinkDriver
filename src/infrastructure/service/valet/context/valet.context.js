import React, { createContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { CREATE_VALET, SEND_LOCATION, START_VALET } from "../../mutation";
import { VALET_EXISTS, GET_STARTED_VALET } from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ValetContext = createContext();

export const ValetStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  NOT_STARTED: "NOT_STARTED",
  CUSTOMER_VEHICLE_PICK_UP: "CUSTOMER_VEHICLE_PICK_UP",
  CUSTOMER_VEHICLE_DROP_OFF: "CUSTOMER_VEHICLE_DROP_OFF",
  VALET_VEHICLE_PICK_UP: "VALET_VEHICLE_PICK_UP",
  VALET_VEHICLE_DROP_OFF: "VALET_VEHICLE_DROP_OFF",
  DEALERSHIP_TO_CUSTOMER_STARTED: "DEALERSHIP_TO_CUSTOMER_STARTED",
  DEALERSHIP_TO_CUSTOMER_COMPLETED: "DEALERSHIP_TO_CUSTOMER_COMPLETED",
  CUSTOMER_TO_DEALERSHIP_STARTED: "CUSTOMER_TO_DEALERSHIP_STARTED",
  CUSTOMER_TO_DEALERSHIP_COMPLETED: "CUSTOMER_TO_DEALERSHIP_COMPLETED",
  CUSTOMER_RETURN_STARTED: "CUSTOMER_RETURN_STARTED",
  CUSTOMER_RETURN_COMPLETED: "CUSTOMER_RETURN_COMPLETED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const ValetProvider = ({ children }) => {
  const [screen, setScreen] = useState("details");
  const [startedValet, setStartedValet] = useState({});
  const [selectedValet, setSelectedValet] = useState({});
  const [createValet, { loading }] = useMutation(CREATE_VALET);
  const [startValet, { data: startValetData }] = useMutation(START_VALET);
  const [sendLocation] = useMutation(SEND_LOCATION);
  const [valetData, setValetData] = useState({});
  const [valetExists, { data }] = useLazyQuery(VALET_EXISTS);
  const [exists, setExists] = useState(false);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("dealership");
  const getAllStartedDriverValets = useQuery(GET_STARTED_VALET, {
    fetchPolicy: "network-only",
  });

  const onValetExists = async (orderId) => {
    try {
      await valetExists({ variables: { orderId: orderId } }).then(
        ({ data }) => {
          setExists(data.valetExists);
        }
      );
      console.log("data from valet exists", data);
    } catch (error) {
      console.log("error from valet exists", error);
      setError(error);
      throw error;
    }
  };

  const onCreateValet = async (inputs) => {
    inputs.userType = userType;
    try {
      await onValetExists(inputs.orderId);
      if (exists) {
        throw new Error("Valet already started");
      }
      const { data } = await createValet({ variables: { inputs: inputs } });
      setValetData(data.createValet);
      // await AsyncStorage.setItem("valet", JSON.stringify(valetData));
    } catch (error) {
      // console.log("error from start valet", error);
      throw error;
    }
  };

  const onStartValet = async (state, valetId, inputs = null) => {
    console.log(state, valetId, inputs, "$$$$$$$$$$$$$$$$$$$");
    try {
      const { data } = await startValet({
        variables: { state: state, valetId: valetId, inputs: inputs },
      });
      setStartedValet(data.updateValet);
      console.log("data from start valet", data);
    } catch (error) {
      console.log("error from start valet", error);
      throw error;
    }
  };

  const onGetStartedValet = async () => {
    try {
      await getAllStartedDriverValets.refetch().then(({ data }) => {
        console.log(
          "data from get all started valet",
          data.getAllStartedDriverValets[0]
        );
        if (data) {
          setStartedValet(data.getAllStartedDriverValets[0]);
          console.log("selected valet########", data);
        }
      });
    } catch (error) {
      console.log("error########## from here", error.message);
      setError(error.message);
    }
  };

  const onChangeLocation = async ({ valetId, latitude, longitude }) => {
    try {
      await sendLocation({
        variables: {
          valetId: valetId,
          latitude: latitude,
          longitude: longitude,
        },
      });
    } catch (error) {
      console.log("error from location", error);
      throw error;
    }
  };

  // useEffect(() => {
  //   onGetStartedValet();
  // }, []);

  return (
    <ValetContext.Provider
      value={{
        error,
        screen,
        exists,
        loading,
        userType,
        valetData,
        startedValet,
        selectedValet,
        setScreen,
        valetExists,
        setUserType,
        onStartValet,
        onCreateValet,
        onValetExists,
        setStartedValet,
        onChangeLocation,
        setSelectedValet,
        onGetStartedValet,
      }}
    >
      {children}
    </ValetContext.Provider>
  );
};
