import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { LabelFormComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const SigninScreen = ({ navigation }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
  } = useContext(AuthContext);

  return (
    <>
      <Container>
        <Spacer variant="top.large" />
        <LabelFormComponent size={"100%"}>Username</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={username}
          onChangeText={(text) => {
            if (text.length === 0) {
              setUsernameError(true);
            }
            if (text.length > 0 && usernameError) {
              setUsernameError(false);
            }
            setUsername(text);
          }}
          isError={usernameError}
        />
        {usernameError && <ErrorText>Username required</ErrorText>}
        <Spacer variant="top.small" />
        <Spacer variant="top.small" />
        <LabelFormComponent>Password</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={password}
          onChangeText={(text) => {
            if (text.length === 0) {
              setPasswordError(true);
            }
            if (text.length > 0 && passwordError) {
              setPasswordError(false);
            }
            setPassword(text);
          }}
          secure
          isError={passwordError}
        />
        {passwordError && <ErrorText>Password Required</ErrorText>}
        <Spacer variant="top.xsmall" />
        <LabelFormComponent size="small">Forgot Password?</LabelFormComponent>
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
      </Container>
    </>
  );
};
