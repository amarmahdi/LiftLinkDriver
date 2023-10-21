import React, { useState, createContext, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Login, Logout, Signup } from "../../mutation";
import { IS_AUTHENTICATED } from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [login, { loading: loginLoading }] = useMutation(Login);
  const [isAuthenticatedQuery] = useLazyQuery(IS_AUTHENTICATED);
  const [logout] = useMutation(Logout);
  const [signup] = useMutation(Signup);
  const [screen, setScreen] = useState("signup");

  // Signup/Signin states and functions
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  // names 
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState(false);

  const onLogin = async (username, password) => {
    if (usernameError || passwordError) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await login({ variables: { username, password } });
      setUser(data.login.user);
      await AsyncStorage.setItem("token", data.login.token);
      setIsAuthenticated(true);
      setLoading(loginLoading);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log("error", error.message);
      throw error;
    }
  };

  const onSignup = async (username, password, email) => {
    console.log({ username: username, password: password, email: email });
    if (usernameError || passwordError || emailError) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await signup({
        variables: {
          input: { username, password, email, accountType: "driver" },
        },
      });
      setUser(data.register.user);
      await AsyncStorage.setItem("token", data.register.token);
      setIsAuthenticated(true);
      setLoading(loginLoading);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log("error", error.message);
    }
  };

  const onLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const {
          data: { isLoggedIn },
        } = await isAuthenticatedQuery();
        if (isLoggedIn) {
          setIsAuthenticated(true);
          setError(null);
        } else {
          setIsAuthenticated(false);
          setError(null);
          AsyncStorage.clear();
        }
      }
    } catch (error) {
      // console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        setError,
        user,
        isAuthenticated,
        onLogin,
        onLogout,
        screen,
        setScreen,
        username,
        setUsername,
        password,
        setPassword,
        usernameError,
        setUsernameError,
        passwordError,
        setPasswordError,
        email,
        setEmail,
        emailError,
        setEmailError,
        phone,
        setPhone,
        phoneError,
        setPhoneError,
        onSignup,
        firstName,
        setfirstName,
        firstNameError,
        setfirstNameError,
        lastName,
        setlastName,
        lastNameError,
        setlastNameError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
