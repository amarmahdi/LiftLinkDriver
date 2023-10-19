import React, { createContext, useContext, useState, useEffect } from "react";
import { DriverContext } from "./driver.context";

export const DriverProfileContext = createContext();

export const DriverProfileProvider = ({ children }) => {
  const { profile: data, loading: profileLoading } = useContext(DriverContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (profile) {
      setLoading(profileLoading);
    }
  } , [profileLoading]);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  } , [data]);

  return (
    <DriverProfileContext.Provider
      value={{
        profile,
        loading,
      }}
    >
      {children}
    </DriverProfileContext.Provider>
  );
};
