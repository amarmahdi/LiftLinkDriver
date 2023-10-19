/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { MainContainer } from "../../../components/main.container.component";
import { DriverProfileScreen } from "./driver.profile.screen";
import { ImageContainerProvider } from "../utils/imageObjectContainer";

export const DriverScreen = ({ children, navigation }) => {
  return (
    <ImageContainerProvider>
      <MainContainer
        showAvatar={false}
        showLogo={true}
      >
        <DriverProfileScreen navigation={navigation}/>
      </MainContainer>
    </ImageContainerProvider>
  );
};
