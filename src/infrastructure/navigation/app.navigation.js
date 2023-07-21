import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SigninNavigator } from "./signin.navigation";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const AppNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} >
			<>
				<Stack.Screen name="Main" component={MainNavigator} />
			</>
		</Stack.Navigator>
	);
}
