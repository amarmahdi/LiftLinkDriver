import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { MainContainer } from "../../../components/main.container.component";
import {
  LabelComponent,
  LabelFormComponent,
} from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import { ButtonComponent } from "../../../components/button.component";
import LogOutIcon from "../../../../assets/svgs/logout";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const SigninScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { isAuthenticated, onLogin, loading, err } = useContext(AuthContext);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("MainNavigation");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const data = await onLogin(username, password)
      console.log("data", data);
    } catch (error) {
      Alert.alert("Alert!", "Failed to login. Please try again.");
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoadingState(false);
    }
    if (err) {
      setLoadingState(false);
    }
    if (usernameError || passwordError) {
      setLoadingState(false);
    }
    if (loading) {
      setLoadingState(true);
    }
  }, [loading]);

  useEffect(() => {
    if (err) {
      Alert.alert("Alert!", "Failed to login. Please try again.");
      setLoadingState(false);
    }
  }, [err]);

  return (
    <MainContainer showLogo={true}>
      <ScrollView>
        <Container>
          <LabelComponent title={true}>Sign In</LabelComponent>
          <Spacer variant="top.medium" />
          <Spacer variant="top.medium" />
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
            error={usernameError}
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
            error={passwordError}
          />
          {passwordError && <ErrorText>Password Required</ErrorText>}
          <Spacer variant="top.xsmall" />
          <LabelFormComponent size="small">Forgot Password?</LabelFormComponent>
          <Spacer variant="top.medium" />
          <Spacer variant="top.medium" />
        </Container>
        <ButtonContainer>
          <ButtonComponent
            title="Sign In"
            onPress={() => {
              if (username.length === 0) setUsernameError(true);
              if (password.length === 0) setPasswordError(true);
              if (!usernameError && !passwordError) handleLogin();
            }}
            loading={loadingState}
          />
          {/* <LogOutIcon isIcon={true} width={24} height={24} /> */}
          <LabelComponent inverted={true}>hello</LabelComponent>
        </ButtonContainer>
      </ScrollView>
    </MainContainer>
  );
};
