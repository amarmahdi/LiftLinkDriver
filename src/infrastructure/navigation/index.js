import React, { useContext, useEffect } from "react";
import { AppNavigator } from "./app.navigation";
import { AuthContext } from "../service/authentication/context/auth.context";
import { SigninNavigator } from "./signin.navigation";
import { NavigationContainer } from "@react-navigation/native";

export const Navigator = () => {
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		console.log("isAuthenticated", isAuthenticated)
	}, [isAuthenticated])

	return (
		<NavigationContainer>
			{isAuthenticated ?
				<AppNavigator />
				: <SigninNavigator />}
		</NavigationContainer>
	)
}
