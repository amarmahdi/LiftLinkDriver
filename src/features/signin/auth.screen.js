import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { AuthContext } from "../../infrastructure/service/authentication/context/auth.context";
import { MainContainer } from "../../components/main.container.component";
import { SigninScreen } from "./screen/signin.screen";
import { LabelComponent } from "../../components/typography";
import { ButtonComponent } from "../../components/button.component";
import LogOutIcon from "../../../assets/svgs/logout";
import { Spacer } from "../../components/utils/spacer.component";

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
`;

export const AuthScreen = ({ navigation }) => {
  const { screen } = useContext(AuthContext);
  return (
    <MainContainer showLogo={true} showGreetings={true}>
      <ScrollView>
        <LabelContainer>
          <LabelComponent title={true}>
            {screen === "signin" ? "Sign In" : "Sign Up"}
          </LabelComponent>
          <LabelComponent dateTitle={true}>
            {screen === "signin" ? "Sign Up" : "Sign In"}
          </LabelComponent>
        </LabelContainer>
        <Spacer variant={"top.large"} />
        {screen === "signin" && <SigninScreen navigation={navigation} />}
      </ScrollView>
      {screen === "signin" && (
        <ButtonContainer>
          <ButtonComponent
            title="Sign In"
            // onPress={() => {
            //   if (username.length === 0) setUsernameError(true);
            //   if (password.length === 0) setPasswordError(true);
            //   if (!usernameError && !passwordError) handleLogin();
            // }}
            // loading={loadingState}
          />
          <LogOutIcon width={24} height={24} />
        </ButtonContainer>
      )}
      {screen === "signup" && (
        <ButtonContainer>
          <ButtonComponent
            title="Sign Up"
            // onPress={() => {
            //   if (username.length === 0) setUsernameError(true);
            //   if (password.length === 0) setPasswordError(true);
            //   if (!usernameError && !passwordError) handleLogin();
            // }}
            // loading={loadingState}
          />
          <LogOutIcon width={24} height={24} />
        </ButtonContainer>
      )}
    </MainContainer>
  );
};
