import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { LabelFormComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const DriverPhoneVerificationScreen = ({ navigation }) => {
  const { phone, setPhone, phoneError, setPhoneError } =
    useContext(AuthContext);

  return (
    <>
      <Container>
        <Spacer variant="top.large" />
        <LabelFormComponent size={"100%"}>Phone</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={phone}
          onChangeText={(text) => {
            if (text.length === 0) {
              setPhoneError(true);
            }
            if (text.length > 0 && phoneError) {
              setPhoneError(false);
            }
            setPhone(text);
          }}
          isError={phoneError}
        />
        {phoneError && <ErrorText>Phone required</ErrorText>}
        <Spacer variant="top.small" />
        <Spacer variant="top.small" />
      </Container>
    </>
  );
};
