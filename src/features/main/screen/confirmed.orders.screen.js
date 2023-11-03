import React, { useContext, useState, useEffect, useRef } from "react";
import { OrderConfirmationContext } from "../../../infrastructure/service/confirmation/context/order.confirmation.context";
import { MainContainer } from "../../../components/main.container.component";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import { colors } from "../../../infrastructure/theme/colors";
import { LabelComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";
import { ActivityIndicator } from "react-native-paper";
import { OverlayComponent } from "../../../components/overlay.component";
import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";

const HomeContainer = styled.ScrollView`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
`;

const Image = styled.Image`
  resize-mode: contain;
  width: 100%;
`;

const NoOrderContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;

const NoOrderImg = styled.Image`
  resize-mode: contain;
`;

const OrderContainer = styled(CardComponent)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
`;

const TopSpacer = styled.View`
  margin-top: ${(props) => (props.none ? "120" : "20")}px;
`;

const LoadingContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;

export const ConfirmedOrdersScreen = ({ navigation }) => {
  const {
    confirmedOrders,
    onGetConfirmedOrders,
    error,
    loading,
    incrementPage,
  } = useContext(OrderConfirmationContext);
  const { setSelectedValet } = useContext(ValetContext);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollViewRef = useRef();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onGetConfirmedOrders();
  }, []);

  useEffect(() => {
    if (error && error !== "No assigned orders found") {
      setErrorMessage(error);
      setShowError(true);
    }
  }, [error]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    setIsEndReached(isEnd);
  };

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const isEnd =
      scrollViewRef.current?.getScrollResponder().getScrollableNode()
        .offsetHeight <= contentHeight;
    setIsEndReached(isEnd);
  };

  const handleEndReached = () => {
    if (isEndReached) {
      onGetConfirmedOrders();
      incrementPage();
    }
  };

  return (
    <>
      <MainContainer showAvatar={true} secondaryPage={true} navigation={navigation}>
        <HomeContainer
          ref={scrollViewRef}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onScrollEndDrag={handleEndReached}
        >
          {confirmedOrders.length === 0 && !loading && (
            <NoOrderContainer>
              <NoOrderImg
                source={require("../../../../assets/emptyIndicator.png")}
                resizeMode="contain"
              />
              <Spacer variant="top.large" />
              <LabelComponent title={true}>No order(s)</LabelComponent>
              <Spacer variant="top.medium" />
              <LabelComponent
                styles={{
                  textAlign: "center",
                  width: "80%",
                }}
              >
                You can view an order in your order list after it has been
                added.
              </LabelComponent>
            </NoOrderContainer>
          )}
          {confirmedOrders.length > 0 && (
            <TopSpacer none={!confirmedOrders.length > 0}>
              <LabelComponent title={true}>Confirmed Order(s)</LabelComponent>
              {confirmedOrders.map((item) => (
                <>
                  <OrderContainer
                    backgroundColor={colors.bg.secondary}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    order={true}
                    data={item}
                    onPress={() => {
                      setSelectedValet(item);
                      navigation.navigate("Valet");
                    }}
                    key={item.assignId}
                  >
                    <Image
                      source={require("../../../../assets/emptyIndicator.png")}
                      resizeMode="contain"
                    />
                  </OrderContainer>
                </>
              ))}
            </TopSpacer>
          )}
          {showError && (
            <OverlayComponent
              // onConfirm={closeModals}
              // onCancel={onClose}
              btnText={"Return Home"}
            >
              <LabelComponent title2={true}>{errorMessage}</LabelComponent>
            </OverlayComponent>
          )}
          {loading && (
            <LoadingContainer>
              <LogoSvg width={100} height={120} />
            </LoadingContainer>
          )}
        </HomeContainer>
      </MainContainer>
    </>
  );
};
