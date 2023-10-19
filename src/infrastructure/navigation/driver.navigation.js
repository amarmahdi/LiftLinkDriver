import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { DriverCarInfoScreen } from '../../features/driver/screens/driver.carinfo.screen'
import { DriverScreen } from "../../features/driver/screens/driver.screen";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const DriverNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverProfile" component={DriverScreen} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
      {/* <Stack.Screen name="DriverCarInfoScreen" component={DriverCarInfoScreen} /> */}
    </Stack.Navigator>
  );
};
