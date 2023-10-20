import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DriverScreen } from "../../features/driver/driver.screen";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const DriverNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverProfile" component={DriverScreen} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
    </Stack.Navigator>
  );
};
