import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "./../../features/main/screen/splash.screen";
import { MainNavigator } from "./main.navigation";
import { AuthNavigator } from "./auth.navigation";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
      <Stack.Screen name="AuthNavigation" component={AuthNavigator} />
    </Stack.Navigator>
  );
};
