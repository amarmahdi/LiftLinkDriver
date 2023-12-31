/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from "react";
import { LabelComponent as Label } from "../../../components/typography/label.component";
// import { MainContainer } from "../../../components/main.container.component";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { Spacer } from "../../../components/utils/spacer.component";
import { CamCardComponent } from "../components/camera.card.component";
import { ButtonComponent } from "../../../components/button.component";
import styled from "styled-components/native";
// import { ScrollViewComponent } from "react-native";
import { ImageContainerContext } from "../utils/imageObjectContainer";
// import { uploadToFirebase } from "../../../../firebase-config";
import { InputComponent } from "../../../components/input.component";
import { LabelFormComponent } from "../../../components/typography/label.form.component";
import { isObjEmpty } from "../../main/screen/main.screen";
// import { DriverProfileContext } from "../../../infrastructure/service/driver/context/driver.profile.context";
import {
  ValetContext,
  ValetStatus,
} from "../../../infrastructure/service/valet/context/valet.context";
import { uploadToFirebase } from "../../../../firebase-config";
// import { Add_CAR_INFO } from "../../../infrastructure/service/mutation";
// import { useMutation } from "@apollo/client";
import UploadProgress from "../../../../assets/svgs/upload_progress";
import { OverlayComponent } from "../../../components/overlay.component";
import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import { Platform } from "react-native";

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
`;

const IncrementBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.bg.secondary};
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ErrorMessage = styled.Text`
  color: ${(props) => props.theme.colors.text.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title2};
`;

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.formColors.border};
  width: 100%;
  padding: 20px;
  height: ${(props) => props.height || "60px"};
  max-height: ${(props) => props.height || "60px"};
  text-align-vertical: top;
`;

const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.theme.screenSizes.original.height}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

export const ValetLoanerScreen = ({ navigation }) => {
  const [progressFront, setProgressFront] = useState(100);
  const [progressBack, setProgressBack] = useState(100);
  const [progressLeft, setProgressLeft] = useState(100);
  const [progressRight, setProgressRight] = useState(100);
  const [gasLevel, setGasLevel] = useState("");
  const [comments, setComments] = useState("");
  const [mileage, setMileage] = useState("");
  const [frontImgUrl, setFrontImgUrl] = useState("");
  const [backImgUrl, setBackImgUrl] = useState("");
  const [leftImgUrl, setLeftImgUrl] = useState("");
  const [rightImgUrl, setRightImgUrl] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [totalUploadProgress, setTotalUploadProgress] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fimgError, setFimgError] = useState(false);
  const [bimgError, setBimgError] = useState(false);
  const [limgError, setLimgError] = useState(false);
  const [rimgError, setrImgError] = useState(false);
  const [mileageError, setMileageError] = useState(false);
  const [gasLevelError, setGasLevelError] = useState(false);
  const { profile } = useContext(DriverContext);
  const { front, back, left, right, clearall } = useContext(
    ImageContainerContext
  );
  const {
    setScreen,
    userType,
    selectedValet,
    onCreateValet,
    valetData,
    onValetExists,
    exists,
    onStartValet,
    startedValet,
    error: valetError,
  } = useContext(ValetContext);

  useEffect(() => {
    const progressValues = [
      progressFront,
      progressBack,
      progressLeft,
      progressRight,
    ];
    const validProgressValues = progressValues.filter(
      (value) => typeof value === "number" && !isNaN(value)
    );
    const averageProgress =
      validProgressValues.reduce((sum, value) => sum + value, 0) /
      validProgressValues.length;
    setTotalUploadProgress(averageProgress);
  }, [
    frontImgUrl,
    backImgUrl,
    leftImgUrl,
    rightImgUrl,
    progressFront,
    progressBack,
    progressLeft,
    progressRight,
  ]);

  const uploadImages = async () => {
    // console.log(selectedValet.order.orderId, "selectedValet");
    // setError(false);
    // setErrorMessage("");
    // setFimgError(false);
    // setBimgError(false);
    // setLimgError(false);
    // setrImgError(false);
    // setMileageError(false);
    // setGasLevelError(false);
    // if (userType !== "customer") {
    //   await onValetExists(selectedValet.order.orderId);
    //   if (exists) throw new Error("Valet already started");
    // }
    // setInProgress(true);
    // if (
    //   isObjEmpty(front) ||
    //   isObjEmpty(back) ||
    //   isObjEmpty(left) ||
    //   isObjEmpty(right)
    // ) {
    //   setErrorMessage("Please take all pictures");
    //   setError(true);
    // }
    // if (front === "") {
    //   setFimgError(true);
    //   setError(true);
    // }
    // if (back === "") {
    //   setBimgError(true);
    //   setError(true);
    // }
    // if (left === "") {
    //   setLimgError(true);
    //   setError(true);
    // }
    // if (right === "") {
    //   setrImgError(true);
    //   setError(true);
    // }
    // if (mileage === "") {
    //   setMileageError(true);
    //   setError(true);
    // }
    // if (gasLevel === "") {
    //   setGasLevelError(true);
    //   setError(true);
    // }
    // if (error) {
    //   setInProgress(false);
    //   return;
    // }

    try {
      // const frontUrl =
      //   frontImgUrl ||
      //   (await handleUpload(front, (progress) => {
      //     console.log(progress, "progress");
      //     setProgressFront(Number.parseInt(progress));
      //   }));
      // setFrontImgUrl(frontUrl);
      // const rightUrl =
      //   rightImgUrl ||
      //   (await handleUpload(right, (progress) => {
      //     setProgressRight(Number.parseInt(progress));
      //   }));
      // setRightImgUrl(rightUrl);
      // const backUrl =
      //   backImgUrl ||
      //   (await handleUpload(back, (progress) => {
      //     setProgressBack(Number.parseInt(progress));
      //   }));
      // setBackImgUrl(backUrl);
      // const leftUrl =
      //   leftImgUrl ||
      //   (await handleUpload(left, (progress) => {
      //     setProgressLeft(Number.parseInt(progress));
      //   }));
      // setLeftImgUrl(leftUrl);

      // const datas = {
      //   frontImage: frontUrl,
      //   backImage: backUrl,
      //   leftImage: leftUrl,
      //   rightImage: rightUrl,
      //   mileage: Number.parseInt(mileage),
      //   gasLevel: Number.parseInt(gasLevel),
      //   comments: comments,
      //   customerId: selectedValet.customerId,
      //   dealershipId: selectedValet.dealership.dealershipId,
      //   orderId: selectedValet.order.orderId,
      //   userType: userType,
      // };

      // console.log("selectedValet", startedValet);

      const datas = {
        userType: userType,
        customerId: selectedValet.customerId || startedValet.customer.userId,
        dealershipId:
          selectedValet.dealership.dealershipId || startedValet.dealershipId,
        orderId: selectedValet.order.orderId || startedValet.order.orderId,
        backImage:
          "https://media.istockphoto.com/id/854923054/photo/three-dimensional-modern-white-car.jpg?s=2048x2048&w=is&k=20&c=FIGHMkABg9xpB4vHMEOcCjVRZzw3ogGbLJVpSAryJmw=",
        rightImage:
          "https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=2048x2048&w=is&k=20&c=u_vqLBX3koM67osQVXrWogzYtvgpx__mORzyfBLXo6U=",
        frontImage:
          "https://media.istockphoto.com/id/1154617648/photo/3d-illustration-of-generic-compact-car-front-view.jpg?s=2048x2048&w=is&k=20&c=scw578Hsr_L2-857IQz9oiiTBJIdovTMlLuISOrKuF4=",
        leftImage:
          "https://media.istockphoto.com/id/1135255668/photo/blue-hatchback-car.jpg?s=1024x1024&w=is&k=20&c=KDl9n7tu0f73NiymNk_G_KOzIvtijZSJkVWLZ7s8L1Y=",
        comments: "something something......",
        gasLevel: 100,
        mileage: 1000,
      };

      console.log(datas, "datas>>>>>>>>>>>##########");

      if (userType === "dealership") await onCreateValet(datas);
      if (userType === "customer")
        await onStartValet(
          ValetStatus.CUSTOMER_VEHICLE_PICK_UP,
          valetData.valetId || startedValet.valetId,
          datas
        );

      if (valetData) {
        setInProgress(false);
        console.log("im here");
        navigation.navigate("Map");
        clearall();
        return;
      }
    } catch (error) {
      console.log("error#######", error.message);
      setInProgress(false);
      setErrorMessage(error.message);
      setError(true);
    }
  };

  const handleUpload = async (image, cb) => {
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    const data = await uploadToFirebase(
      image,
      `valet_vehicle_checks/${profile.username}/${fileName}`,
      (progress) => {
        cb(progress.toFixed(0));
      }
    );
    return data.url;
  };

  useEffect(() => {
    if (error)
      Alert.alert("Error", "Faild to upload vehicle check. Please try again");
  }, [error]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollViewContainer>
          <Container
            styles={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          ></Container>
          <>
            <UploadProgress />
            <Spacer variant="top.large" />
            <Label title2={true}>Loaner Car: All Side Picture</Label>
            <Spacer variant="top.medium" />
            <ScrollView>
              <>
                <Spacer variant="top.large" />
                <Label title2={true}>Front</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"front"} />
                {/* <StyledText>{progressFront}</StyledText> */}
                <ErrorMessage>
                  {fimgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <Label title2={true}>Right</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"right"} />
                {/* <StyledText>{progressRight}</StyledText> */}
                <ErrorMessage>
                  {rimgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <Label title2={true}>Back</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"back"} />
                {/* <StyledText>{progressBack}</StyledText> */}
                <ErrorMessage>
                  {bimgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <Label title2={true}>Left</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"left"} />
                {/* <StyledText>{progressLeft}</StyledText> */}
                <ErrorMessage>
                  {limgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <LabelFormComponent size={"100%"}>
                  Car Mileage
                </LabelFormComponent>
                <Spacer variant="top.small" />
                <InputComponent
                  placeholder="Enter Car Mileage"
                  onChangeText={(e) => setMileage(e)}
                />
                <Spacer variant="top.small" />
                <ErrorMessage>
                  {mileage === "" && mileageError
                    ? "This field is required"
                    : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <LabelFormComponent size={"100%"}>Gas Level</LabelFormComponent>
                <Spacer variant="top.small" />
                <InputComponent
                  placeholder="Enter Gas Level"
                  onChangeText={(e) => setGasLevel(e)}
                />
                <Spacer variant="top.small" />
                <ErrorMessage>
                  {gasLevel === "" && gasLevelError
                    ? "This field is required"
                    : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <LabelFormComponent size={"100%"}>Comments</LabelFormComponent>
                <Spacer variant="top.small" />
                <TextInput
                  placeholder="Enter Comments"
                  onChangeText={(e) => setComments(e)}
                  multiline
                  height={300}
                />
                <Spacer variant="top.small" />
              </>
              <Spacer variant="top.large" />
            </ScrollView>
            <Spacer variant="top.large" />
          </>
        </ScrollViewContainer>
      </KeyboardAvoidingView>
      <ButtonContainer>
        <ButtonComponent title="Next" onPress={() => uploadImages()} />
      </ButtonContainer>
      {inProgress && (
        <OverlayComponent override={true}>
          <LogoSvg width={100} height={120} />
          {totalUploadProgress !== 100 && (
            <Label
              title2={true}
              inverted={true}
            >{`${totalUploadProgress.toFixed(0)}%`}</Label>
          )}
          {totalUploadProgress === 100 && (
            <Label title2={true} inverted={true}>
              Please wait...
            </Label>
          )}
        </OverlayComponent>
      )}
    </>
  );
};
