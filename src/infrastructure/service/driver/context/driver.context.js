import React, { createContext, useState, useEffect, useContext } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../query";
import { UPDATE_NAME } from "../../mutation";
import { AuthContext } from "../../authentication/context/auth.context";

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [screen, setScreen] = useState("phoneVerification");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorDriver, setErrorDriver] = useState(null);
  const getUserData = useQuery(GET_USER_INFO, {
    fetchPolicy: "network-only",
  });
  const [updateName] = useMutation(UPDATE_NAME);
  const { firstName, lastName } = useContext(AuthContext);

  // const importUserData = async () => {
  //   if (!loadingDriver && data) {
  //     const profilePicture =
  //       Object.keys(data.getUserInfo.profilePicture).length > 0
  //         ? data.getUserInfo.profilePicture[0]
  //         : {};
  //     console.log(data);
  //     data.getUserInfo.car ?? (data.getUserInfo.car = {});
  //     const modifiedUserInfo = { ...data.getUserInfo, profilePicture }; 
  //     setProfile(modifiedUserInfo);
  //   }
  // };

  const updateNames = async () => {
    try {
      const { data } = await updateName({
        variables: { firstName, lastName },
      });
      console.log(data);
      let _profile = { ...profile };
      _profile.firstName = firstName;
      _profile.lastName = lastName;
      setProfile(_profile);
      return data.updateName;
    } catch (error) {
      console.log(error);
    }
  };

  const onGetUserData = async () => {
    setLoading(true);
    try {
      const { data } = await getUserData.refetch();
      if (data && data.getUserInfo) {
        const profilePicture = data.getUserInfo.profilePicture[0];
        data.getUserInfo.profilePicture = profilePicture;
        setProfile(data.getUserInfo);
      } else {
        throw new Error("No user data found");
      }
    } catch (error) {
      setErrorDriver(`Failed to fetch user data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     importUserData();
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (errorDriver) {
  //     // console.error(errorDriver);
  //   }
  // }, [errorDriver]);

  // useEffect(() => {
  //   setLoading(loadingDriver);
  // }, [loadingDriver]);

  return (
    <DriverContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        onGetUserData,
        screen,
        setScreen,
        updateNames,
        errorDriver,
        setErrorDriver,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
