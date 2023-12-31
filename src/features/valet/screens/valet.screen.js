/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { MainContainer } from "../../../components/main.container.component";
import styled from "styled-components/native";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";
import { ValetLoanerScreen } from "./valet.loaner.screen";
import { ValetInfoScreen } from "./valet.info.screen";
import { ValetContainer } from "../../../components/valet.container.component";
import { ImageContainerProvider } from "../utils/imageObjectContainer";

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export const ValetScreen = ({ navigation }) => {
  const { screen } = useContext(ValetContext);
  return (
    <ImageContainerProvider>
      <>
        {screen === "details" && (
          <ValetContainer>
            <InfoContainer>
              <ValetInfoScreen navigation={navigation} />
            </InfoContainer>
          </ValetContainer>
        )}
        {screen === "loaner" && (
          <MainContainer showAvatar={true} secondaryPage={true} navigation={navigation}>
            <ValetLoanerScreen navigation={navigation} />
          </MainContainer>
        )}
      </>
    </ImageContainerProvider>
  );
};
