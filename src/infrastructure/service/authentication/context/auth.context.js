import React, { useState, createContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Login, Logout } from "../../mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const [login, { loadging, error, data }] = useMutation(Login);
  const [logout] = useMutation(Logout);


  const onLogin = async (username, password) => {
    setLoading(loadging);
    login({ variables: { username, password } })
      .then(async ({ data }) => {
        setUser(data.login.user);
        try {
          await AsyncStorage.setItem("token", data.login.token);
          setIsAuthenticated(true);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }).catch(async (e) => {
        setError(error);
        setLoading(false);
        console.log("e", e)
      });
  };

  const onLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
  };

  useEffect(() => {
    AsyncStorage.getItem("token").then((result) => {
      if (result) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        err,
        user,
        isAuthenticated,
        onLogin,
        onLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

