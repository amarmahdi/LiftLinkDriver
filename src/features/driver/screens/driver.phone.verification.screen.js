import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { LabelFormComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptcha,
  FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import { fbApp, fbAuth, fbOtp } from "../../../../firebase-config";
import { ButtonComponent } from "../../../components/button.component";
import RedirectIcon from "../../../../assets/svgs/redirect";
import firebase, { PhoneAuthProvider } from "firebase/auth";
import { OverlayComponent } from "../../../components/overlay.component";
import { Keyboard } from "react-native";

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

const ButtonContainer = styled.View`
  margin-top: 300px;
  margin-bottom: 20px;
`;

const PositionedButtonComponent = styled(ButtonComponent)`
  position: absolute;
  bottom: 250px;
  width: 100%;
`;

export const DriverPhoneVerificationScreen = ({ navigation }) => {
  const { phone, setPhone, phoneError, setPhoneError } =
    useContext(AuthContext);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [message, showMessage] = useState("");

  useEffect(() => {
    // if (verificationId) {
    //   navigation.navigate("DriverPhoneVerificationCodeScreen", {
    //     verificationId,
    //   });
    // }
    console.log(verificationId, "verificationId");
  }, [verificationId]);

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={fbApp.options}
        title="Prove you are human!"
        cancelLabel="Close"
        containerStyle={{
          width: "100%",
          height: "100%",
          marginTop: "70%",
        }}
      />
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
          placeholder="+1 999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        {phoneError && <ErrorText>Phone required</ErrorText>}
        {message ? (
          <ErrorText>{message}</ErrorText>
        ) : (
          <FirebaseRecaptchaBanner />
        )}
        <Spacer variant="top.small" />
        <Spacer variant="top.small" />
        <ButtonContainer>
          <PositionedButtonComponent
            title="Next"
            onPress={async () => {
              Keyboard.dismiss();
              await fbOtp(phone, recaptchaVerifier).then((verificationId) => {
                setVerificationId(verificationId);
              });
            }}
            icon={<RedirectIcon width={24} height={24} />}
          />
        </ButtonContainer>
      </Container>
    </>
  );
};
