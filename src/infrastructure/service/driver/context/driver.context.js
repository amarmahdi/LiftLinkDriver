import React, { createContext, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../query";

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [
    getUserData,
    { data, loading: loadingDriver, error: errorDriver },
  ] = useLazyQuery(GET_USER_INFO);

  const importUserData = async () => {
    if (!loadingDriver && data) {
      const profilePicture =
        Object.keys(data.getUserInfo.profilePicture).length > 0
          ? data.getUserInfo.profilePicture.find((element) => element.isCurrent)
          : {};
      data.getUserInfo.car ?? (data.getUserInfo.car = {});
      const modifiedUserInfo = { ...data.getUserInfo, profilePicture };
      setProfile(modifiedUserInfo);
    }
  };

  useEffect(() => {
    if (data) {
      importUserData();
    }
  }, [data]);

  useEffect(() => {
    if (errorDriver) {
      // console.error(errorDriver);
    }
  }, [errorDriver]);

  useEffect(() => {
    setLoading(loadingDriver);
  }, [loadingDriver]);

  return (
    <DriverContext.Provider value={{ profile, loading, getUserData }}>
      {children}
    </DriverContext.Provider>
  );
};
