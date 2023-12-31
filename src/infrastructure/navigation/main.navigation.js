import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../features/main/screen/home.screen";
import { DriverNavigation } from "./driver.navigation";
// import { MapNavigator } from "./map.navigation";
// import { DetailsScreen } from "../../features/main/screen/details.screen";
// import { ProfileScreen } from "../../features/profile_picture_upload/screens/profile.screen";
import { DriverContext } from "../service/driver/context/driver.context";
import styled from "styled-components/native";
import { MainScreen } from "../../features/main/screen/main.screen";
import { ConfirmationScreen } from "../../features/main/screen/confirmation.screen";
// import { ServiceNavigation } from "./service.navigation";
import { OrderConfirmationProvider } from "../service/confirmation/context/order.confirmation.context";
import { OrderConfirmationScreen } from "../../features/main/screen/order.confirmation.screen";
import { ConfirmedOrdersScreen } from "../../features/main/screen/confirmed.orders.screen";
import { ValetNavigation } from "./valet.navigation";
import { MapNavigator } from "./map.navigation";

const Stack = createStackNavigator();

const txt = styled.Text`
  color: red;
`;

export const MainNavigator = () => {
  // const { profile, loading } = useContext(DriverContext);

  return (
    <OrderConfirmationProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={DriverNavigation} />
          <Stack.Screen name="Confirm" component={ConfirmationScreen} />
          <Stack.Screen name="ConfirmOrder" component={OrderConfirmationScreen} />
          <Stack.Screen name="ConfirmedOrders" component={ConfirmedOrdersScreen} />
          <Stack.Screen name="Valet" component={ValetNavigation} />
          <Stack.Screen name="Map" component={MapNavigator} />
        </>
      </Stack.Navigator>
    </OrderConfirmationProvider>
  );
};
