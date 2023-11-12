import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "./../../features/main/screen/splash.screen";
import { MainNavigator } from "./main.navigation";
import { AuthScreen } from "../../features/signin/auth.screen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};
