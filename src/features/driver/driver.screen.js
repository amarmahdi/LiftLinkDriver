/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { MainContainer } from "../../components/main.container.component";
import { DriverProfileScreen } from "./screens/driver.profile.screen";
import { ImageContainerProvider } from "./utils/imageObjectContainer";
import { DriverContext } from "../../infrastructure/service/driver/context/driver.context";
import { DriverPhoneVerificationScreen } from "./screens/driver.phone.verification.screen";

export const DriverScreen = ({ children, navigation }) => {
  const { screen } = useContext(DriverContext);

  return (
    <ImageContainerProvider>
      <MainContainer showAvatar={false} showLogo={true}>
        {screen === "profile" && (
          <DriverProfileScreen navigation={navigation} />
        )}
        {screen === "phoneVerification" && (
          <DriverPhoneVerificationScreen navigation={navigation} />
        )}
      </MainContainer>
    </ImageContainerProvider>
  );
};
