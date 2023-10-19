/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import {
  LabelComponent as Label,
  LabelComponent,
} from "../../../components/typography/label.component";
import { MainContainer } from "../../../components/main.container.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { CarComponent } from "../components/car";
import { ButtonComponent } from "../../../components/button.component";
import styled from "styled-components/native";
import ListIcon from "../../../../assets/svgs/listIcon";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";
import { MultilineInputComponent } from "../components/multiline.input.component";
import { InputComponent } from "../../../components/input.component";
import { View } from "react-native";
import { ValetLoanerScreen } from "./valet.loaner.screen";
import { ValetInfoScreen } from "./valet.info.screen";
import { ValetContainer } from "../../../components/valet.container.component";
import { ImageContainerProvider } from "../utils/imageObjectContainer";

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const ElementsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ListIconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
`;

const CarChangeButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const CarChangeButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
`;

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
          <MainContainer>
            <ValetLoanerScreen navigation={navigation} />
          </MainContainer>
        )}
      </>
    </ImageContainerProvider>
  );
};
