import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Container } from "../../../components/utils/container.component";
import SlideButton from "rn-slide-button";
import SlidingUpPanel from "rn-sliding-up-panel";
import {
  ValetContext,
  ValetStatus,
} from "../../../infrastructure/service/valet/context/valet.context";
// import { DriverProfileContext } from "../../../infrastructure/service/driver/context/driver.profile.context";
import { colors } from "../../../infrastructure/theme/colors";
import SliderIcon from "../../../../assets/svgs/slider_icon";
import DestinationIcon from "../../../../assets/svgs/destinationIcon";
import CalendarIcon from "../../../../assets/svgs/calendar2";
import { LabelComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import MapView, { Marker, Polyline } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import * as Location from "expo-location";
import CurrentLocationMarker from "../../../../assets/svgs/current_marker";
import DestinationMarker from "../../../../assets/svgs/destination_marker";
import { Alert } from "react-native";
import { isObjEmpty } from "../../../features/main/screen/main.screen";
import { OverlayComponent } from "../../../components/overlay.component";
import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";
import { format } from "date-fns";
import MapViewDirections from "react-native-maps-directions";
import set from "date-fns/fp/set/index.js";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import { theme } from "../../../infrastructure/theme";

const BottomOverflowContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 45px;
  flex-direction: column;
  position: relative;
`;

const PositionedBgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize-mode: cover;
  border-radius: 45px;
`;

const SliderContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 20px;
  left: 0;
  padding-left: 20px;
  padding-right: 20px;
`;

const BarContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Bar = styled.View`
  width: 120px;
  height: 7px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 10px;
`;
const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: center;
`;

const ContentView = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => props.alignItems || "flex-start"};
  align-self: flex-start;
`;

const DataContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  margin-top: 70px;
`;

const UserInfoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100px;
`;

const UserProfileContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Chip = styled.View`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  dipaly: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: rgba(99, 163, 117, 0.36);
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Avatar = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

const AvatarImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 20px;
`;

const pCoords =
  "isxeIpdjtTm@A?qD?qD?mDfHEjBA?aM?aG@mODop@CmCD[CsBGyBMcAs@kEa@wBq@}GGwC?kCBqAEc@ZkHBgAAkBCs@KkAEc@aBoIc@eCIcAIsCEsBBa@GkEAiDGaCKgP@cB?}@Ia@AwMCs^BoOAyHDyHEsRFeMBaKA_GAqDd@E`A?lBAp@_Df@yBJa@Ba@Ek@AqHf@oGv@iIF}@?eAA{U@oJCqD?cHJ_@@m@AkJAcAKS@yH?wCmB?AxD?pDnBBA`BGX?D";

export const MapScreen = ({ navigation }) => {
  let _panel = useRef(null);
  const {
    screen,
    setScreen,
    selectedValet,
    setSelectedValet,
    startedValet,
    setStartedValet,
    valetData,
    userType,
    setUserType,
    onStartValet,
    onChangeLocation,
  } = useContext(ValetContext);
  const { profile } = useContext(DriverContext);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [swipeText, setSwipeText] = useState("Swipe up to view details");
  const [viewData, setViewData] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({});
  const [locationErrMsg, setLocationErrMsg] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [destinationLocation, setDestinationLocation] = useState("");
  const [destinationCoords, setDestinationCoords] = useState({});
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [bounds, setBounds] = useState({});
  const mapRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState(null);
  const [count, setCount] = useState(0);
  const [currentLocationTracker, setCurrentLocationTracker] = useState({});

  const decodePolyline = (pl) => {
    const decoded = decode(pl);
    return decoded.map((d) => {
      return {
        latitude: d[0] || 0,
        longitude: d[1] || 0,
      };
    });
  };

  const setPoly = async () => {
    const decoded = decodePolyline(pCoords);
    setPolylineCoords(decoded);
  };

  const changeCurrentLocation = async (curLoc) => {
    setCurrentLocationTracker(curLoc);
  };

  useEffect(() => {
    setPoly();
    console.log(currentLocation);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount((prev) => prev + 1);
  //     if (polylineCoords[count] !== undefined) changeCurrentLocation(polylineCoords[count])
  //     console.log("count", count);
  //     console.log("polylineCoords", polylineCoords[count]);
  //   }, 4000);
  // }, [polylineCoords]);

  const mapCamView = async (coords) => {
    if (
      mapRef.current &&
      currentLocation &&
      destinationCoords &&
      !loadingLocation
    ) {
      await mapRef.current.fitToCoordinates(coords, {
        edgePadding: {
          top: 100,
          right: 30,
          bottom: 300,
          left: 30,
        },
        animated: true,
        tilt: 45,
      });
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationErrMsg("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setCurrentLocationTracker({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        onChangeLocation({
          valetId: selectedValet.valetId || valetData.valetId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );

    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    mapRef.current.setCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      pitch: 45,
      heading: 90,
      altitude: 1000,
    });

    return location;
  };

  useEffect(() => {
    if (isObjEmpty(currentLocation)) {
      getLocation();
    }
    console.log(selectedValet.order.pickupLocation, "selectedValet");
    if (userType === "dealership")
      setDestinationLocation(selectedValet.order.pickupLocation + ", Edmonton");
    else if (userType === "customer")
      setDestinationLocation(selectedValet.dealership.dealershipAddress);
    else Alert.alert("Error", "Invalid user type");
  }, []);

  useEffect(() => {
    if (!isObjEmpty(currentLocation)) {
      setLoadingLocation(false);
    }
  }, [currentLocation]);

  const onFinish = async () => {
    navigation.navigate("Valet");
  };

  useEffect(() => {
    console.log("startedValet###########", startedValet);
    if (
      !isObjEmpty(startedValet) &&
      (startedValet.valetStatus ===
        ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED ||
        startedValet.valetStatus ===
          ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED ||
        startedValet.valetStatus === ValetStatus.CUSTOMER_RETURN_STARTED)
    ) {
      setStarted(true);
    }
  }, []);

  return (
    <>
      {!loadingLocation ? (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={currentLocation}
          customMapStyle={theme.customMapStyle}
          provider="google"
        >
          {!loadingLocation && (
            <MapViewDirections
              apikey="AIzaSyCQ_V0ZfCs0h_ruPXAUhpkh8P-IK89P_LM"
              origin={currentLocation}
              destination={destinationLocation}
              strokeWidth={5}
              strokeColor={colors.buttonColors.quaternary}
              optimizeWaypoints={true}
              onReady={async (result) => {
                setCameraPosition({
                  center: {
                    latitude: result.coordinates[0].latitude,
                    longitude: result.coordinates[0].longitude,
                  },
                  pitch: 0,
                  heading: 0,
                  zoom: 10,
                  altitude: 0,
                });
                setPolylineCoords(result.coordinates);
                setDestinationCoords({
                  latitude:
                    result.coordinates[result.coordinates.length - 1].latitude,
                  longitude:
                    result.coordinates[result.coordinates.length - 1].longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
                await mapCamView(result.coordinates);
              }}
            />
          )}
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocationTracker.latitude || 0,
                longitude: currentLocationTracker.longitude || 0,
              }}
            >
              <CurrentLocationMarker width={40} height={40} />
            </Marker>
          )}
          {destinationCoords && (
            <Marker
              coordinate={{
                latitude: destinationCoords.latitude || 0,
                longitude: destinationCoords.longitude || 0,
              }}
            >
              <DestinationMarker width={40} height={40} />
            </Marker>
          )}
        </MapView>
      ) : (
        <>
          <OverlayComponent override={true}>
            <LogoSvg width={100} height={120} />
            <Spacer variant="top.large" />
          </OverlayComponent>
        </>
      )}
      <SlidingUpPanel
        ref={(c) => (_panel = c)}
        draggableRange={{
          top: 470,
          bottom: 180,
        }}
        backdropOpacity={0.2}
        snappingPoints={[470, 180]}
        onMomentumDragEnd={(position) => {
          if (position < 400) {
            setSwipeText("Swipe up to view details");
            // setViewData(false);
          } else {
            setSwipeText("Swipe down to close");
            // setViewData(true);
          }
        }}
      >
        <BottomOverflowContainer>
          <PositionedBgImage
            source={require("../../../../assets/backgroundPatterns.png")}
          />
          <BarContainer>
            <Bar />
            <LabelComponent inverted={true}>{swipeText}</LabelComponent>
          </BarContainer>
          {viewData && (
            <DataContainer>
              <AvatarContainer>
                <UserProfileContainer>
                  <Avatar>
                    <AvatarImage
                      source={{
                        uri: profile.profilePicture.pictureLink,
                      }}
                    />
                  </Avatar>
                  <Spacer variant="left.medium" />
                  <UserInfoContainer>
                    <LabelComponent inverted={true}>
                      {profile.firstName} {profile.lastName}
                    </LabelComponent>
                    <Spacer variant="top.small" />
                    <Chip>
                      <LabelComponent
                        inverted={true}
                        styles={{
                          fontSize: 12,
                        }}
                        title2={true}
                      >
                        {profile.accountType.toUpperCase()}
                      </LabelComponent>
                    </Chip>
                  </UserInfoContainer>
                </UserProfileContainer>
                <UserInfoContainer>
                  <LabelComponent
                    inverted={true}
                    styles={{
                      fontSize: 12,
                    }}
                    title2={true}
                  >
                    UID 112233
                  </LabelComponent>
                  <Spacer variant="left.medium" />
                  <LabelComponent
                    inverted={true}
                    styles={{
                      fontSize: 12,
                    }}
                    title2={true}
                  >
                    5 Reviews
                  </LabelComponent>
                </UserInfoContainer>
              </AvatarContainer>
              <Spacer variant="top.large" />
              <ContentContainer>
                <DestinationIcon width={36} height={36} />
                <ContentView>
                  <LabelComponent inverted={true}>
                    Pickup Location
                  </LabelComponent>
                  <Spacer variant="top.xsmall" />
                  {!isObjEmpty(selectedValet) && (
                    <LabelComponent inverted={true} title2={true}>
                      {selectedValet.order.pickupLocation || "N/A"}
                    </LabelComponent>
                  )}
                </ContentView>
              </ContentContainer>
              <Spacer variant="top.large" />
              <ContentContainer>
                <CalendarIcon width={36} height={36} />
                <ContentView>
                  <LabelComponent inverted={true}>
                    Service Delivery Date
                  </LabelComponent>
                  <Spacer variant="top.xsmall" />
                  <LabelComponent inverted={true} title2={true}>
                    {format(
                      new Date(selectedValet.order.orderDeliveryDate),
                      "MM/dd/yyyy"
                    )}
                  </LabelComponent>
                </ContentView>
              </ContentContainer>
            </DataContainer>
          )}
        </BottomOverflowContainer>
      </SlidingUpPanel>
      <SliderContainer>
        <SlideButton
          title="Slide to start"
          borderRadius={20}
          padding={0}
          reverseSlideEnabled={true}
          containerStyle={{
            backgroundColor: started
              ? colors.buttonColors.error
              : colors.buttonColors.primary,
            padding: 0,
            margin: 0,
          }}
          underlayStyle={{
            backgroundColor: started
              ? colors.buttonColors.error
              : colors.buttonColors.primary,
            padding: 0,
            margin: 0,
          }}
          icon={<SliderIcon width={25} height={25} />}
          thumbStyle={{
            backgroundColor: started
              ? colors.buttonColors.error
              : colors.buttonColors.primary,
            padding: 0,
            margin: 0,
          }}
          onSlideEnd={async () => {
            if (!started && userType === "dealership") {
              console.log("DEALERSHIP_TO_CUSTOMER_STARTED");
              await onStartValet(
                ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED,
                selectedValet.valetId || valetData.valetId
              );
              setStarted(true);
              return;
            }
            if (userType === "dealership" && started) {
              console.log("DEALERSHIP_TO_CUSTOMER_COMPLETED");
              await onStartValet(
                ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED,
                selectedValet.valetId || valetData.valetId
              );
              setUserType("customer");
              setStarted(false);
              setScreen("details");
            }
            if (!started && userType === "customer") {
              console.log("CUSTOMER_TO_DEALERSHIP_STARTED");
              await onStartValet(
                ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED,
                selectedValet.valetId || valetData.valetId
              );
              setStarted(true);
              return;
            }
            if (started && userType === "customer") {
              console.log("CUSTOMER_TO_DEALERSHIP_COMPLETED");
              await onStartValet(
                ValetStatus.CUSTOMER_TO_DEALERSHIP_COMPLETED,
                selectedValet.valetId || valetData.valetId
              );
              setUserType("confirm_completion");
              setStarted(false);
              setScreen("details");
            }
            onFinish();
          }}
          autoReset={true}
        />
      </SliderContainer>
    </>
  );
};
