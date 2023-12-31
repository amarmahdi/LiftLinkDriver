import React, { useContext, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Card } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { useIsFocused } from "@react-navigation/native";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import { LabelComponent } from "../../../components/typography/label.component";
import { MainContainer } from "../../../components/main.container.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { CardComponent } from "../../../components/utils/card.component";
import styled from "styled-components/native";
import RedirectIcon from "../../../../assets/svgs/redirect";
import CalendarSvg from "../../../../assets/svgs/calendar";
import { colors } from "../../../infrastructure/theme/colors";
import { ConfirmationContext } from "../../../infrastructure/service/confirmation/context/confirmation.context";
// import { DriverProfileContext } from "../../../infrastructure/service/driver/context/driver.profile.context";
import { OrdersContext } from "../../../infrastructure/service/orders/context/orders.context";
import { OrderConfirmationContext } from "../../../infrastructure/service/confirmation/context/order.confirmation.context";
import { ButtonComponent } from "../../../components/button.component";
import { isObjEmpty } from "./main.screen";
import {
  ValetContext,
  ValetStatus,
} from "../../../infrastructure/service/valet/context/valet.context";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";

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

const ListContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const ListComponent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CarDescription = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ListCard = styled.View`
  width: 100%;
  height: 100px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  background-color: #fff;
  shadow-color: #2e2c2f;
  shadow-offset: 2px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  elevation: 5;
`;

const HomeHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const DateLabelContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const CalendarButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DayAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DayAndDateLabels = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 70px;
  background-color: ${(props) =>
    props.isSameDay || props.selected
      ? props.theme.colors.bg.secondary
      : props.theme.colors.bg.primary};
  border-radius: 20px;
`;

const StyledPagerView = styled(PagerView)`
  flex: 1;
  position: absolute;
  top: ${(props) => (!props.pushDown ? "100" : "400")}px;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 100px;
  width: 100%;
  justify-content: space-between;
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

const RequestContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: ${(props) => (props.pushDown ? "120" : "100")}px;
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

const ButtonContainer = styled.View`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
`;

export const HomeScreen = ({ navigation }) => {
  const { profile } = useContext(DriverContext);
  const {
    error,
    setConfirmation,
    onRefresh: refreshConfirmation,
  } = useContext(ConfirmationContext);
  const {
    orders,
    getAllOrders,
    error: ordersFetchError,
    refreshing: orderRefreshing,
  } = useContext(OrdersContext);
  const { setSelectedOrder: confirmOrder, selectedOrder } = useContext(
    OrderConfirmationContext
  );
  const {
    startedValet,
    onGetStartedValet,
    setSelectedValet,
    setUserType,
    setScreen,
    setStartedValet,
  } = useContext(ValetContext);
  const [today, setToday] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [selected, setSelected] = useState(false);
  const [confirmations, setConfirmations] = useState([]);
  const isFocused = useIsFocused();
  const [dataLoading, setDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");

  const getDates = () =>
    eachWeekOfInterval({
      start: subDays(new Date(), 14),
      end: addDays(new Date(), 14),
    }).reduce((acc, date) => {
      const eachDays = eachDayOfInterval({
        start: date,
        end: addDays(date, 6),
      });
      acc[format(date, "EEE, dd")] = eachDays;
      return acc;
    }, {});

  const getDatas = async () => {
    setDataLoading(true);
    const d = getDates();
    setDates(d);
    setDataLoading(false);
  };

  const onRefresh = async () => {
    setSelectedValet({});
    setStartedValet({});
    setRefreshing(true);
    await onGetStartedValet();
    await getDatas();
    await refreshConfirmation();
    await getAllOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (ordersFetchError) {
      setOrderError(true);
      setOrderErrorMessage(ordersFetchError.message);
    }
  }, [ordersFetchError]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const isSameDay = (d1, d2) =>
    format(d1, "yyyy-MM-dd") === format(d2, "yyyy-MM-dd");

  const currentDateIndex = Object.keys(dates).findIndex((date) =>
    dates[date].some((d) => isSameDay(d, today))
  );

  return (
    <MainContainer
      title={profile.firstName + " " + profile.lastName}
      showGreetings={true}
      showAvatar={true}
      showMenu={true}
      imageUrl={profile.profilePicture.pictureLink}
      navigation={navigation}
    >
      <HomeContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!isObjEmpty(startedValet) && (
          <TopSpacer none={false}>
            <LabelComponent title={true}>Started Order</LabelComponent>
            <OrderContainer
              backgroundColor={colors.bg.secondary}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              order={true}
              data={startedValet}
              onPress={() => {
                // navigation.navigate("Map");
                console.log("started valet", startedValet);
                setSelectedValet(startedValet);
                if (
                  startedValet.valetStatus ===
                    ValetStatus.VALET_VEHICLE_PICK_UP ||
                  startedValet.valetStatus ===
                    ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED
                ) {
                  setUserType("dealership");
                } else if (
                  startedValet.valetStatus ===
                    ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED ||
                  startedValet.valetStatus ===
                    ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED
                ) {
                  setUserType("customer");
                  if (
                    startedValet.valetStatus ===
                    ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED
                  ) {
                    setSelectedValet(startedValet);
                    setScreen("details");
                    navigation.navigate("Valet");
                    return;
                  }
                }
                navigation.navigate("Map");
              }}
            >
              <Image
                source={require("../../../../assets/emptyIndicator.png")}
                resizeMode="contain"
              />
            </OrderContainer>
          </TopSpacer>
        )}
        <HomeHeaderContainer>
          <DateLabelContainer>
            <Spacer variant="top.large" />
            <LabelComponent dateTitle={true}>
              {format(today, "MMM dd, yyyy")}
            </LabelComponent>
            <Spacer variant="top.small" />
            <LabelComponent title={true}>Today</LabelComponent>
          </DateLabelContainer>
          <CalendarButton onPress={() => null}>
            <CalendarSvg width={28} height={28} />
          </CalendarButton>
        </HomeHeaderContainer>
        <StyledPagerView
          initialPage={currentDateIndex}
          pushDown={!isObjEmpty(startedValet)}
        >
          {Object.keys(dates).map((date) => {
            return (
              <DayAndDateContainer key={date}>
                {dates[date].map((d) => {
                  const day = format(d, "EEE");
                  const dayDate = format(d, "dd");
                  return (
                    <DayAndDateLabels
                      isSameDay={isSameDay(d, today)}
                      selected={selected}
                    >
                      <LabelComponent
                        inverted={isSameDay(d, today) || selected}
                      >
                        {day}
                      </LabelComponent>
                      <LabelComponent dateTitle={true}>
                        {dayDate}
                      </LabelComponent>
                    </DayAndDateLabels>
                  );
                })}
              </DayAndDateContainer>
            );
          })}
        </StyledPagerView>
        {dataLoading && refreshing && (
          <RequestContainer pushDown={!isObjEmpty(startedValet)}>
            <ListCard>
              <ListComponent>
                <CarDescription>
                  <LabelComponent>Loading...</LabelComponent>
                </CarDescription>
              </ListComponent>
            </ListCard>
          </RequestContainer>
        )}
        {confirmations.length > 0 && !dataLoading && !refreshing && (
          <RequestContainer pushDown={!isObjEmpty(startedValet)}>
            <LabelComponent>Dealership Request Notification</LabelComponent>
            <Spacer variant="top.large" />
            {confirmations.map((item) => {
              return (
                <ListContainer
                  onPress={() => {
                    setConfirmation(item);
                    navigation.navigate("Confirm");
                  }}
                >
                  <ListCard>
                    <ListComponent>
                      <CarDescription>
                        <LabelComponent>
                          {item.dealership.dealershipName}
                        </LabelComponent>
                        <LabelComponent title2={true}>
                          {isSameDay(new Date(item.confirmationDate), today)
                            ? "Today"
                            : format(
                                new Date(item.confirmationDate),
                                "MMM dd, yyyy"
                              )}
                        </LabelComponent>
                      </CarDescription>
                      <RedirectIcon width={24} height={24} />
                    </ListComponent>
                  </ListCard>
                </ListContainer>
              );
            })}
          </RequestContainer>
        )}
        {orders.length === 0 &&
          !dataLoading &&
          !refreshing &&
          !orderRefreshing &&
          orderError && (
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
        {orders.length > 0 && !dataLoading && !refreshing && (
          <TopSpacer none={!confirmations.length > 0}>
            <LabelComponent title={true}>New Order(s)</LabelComponent>
            {orders.map((item) => (
              <>
                <OrderContainer
                  backgroundColor={colors.bg.secondary}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  order={true}
                  data={item}
                  onPress={() => {
                    confirmOrder(item);
                    navigation.navigate("ConfirmOrder");
                  }}
                />
              </>
            ))}
          </TopSpacer>
        )}
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
      </HomeContainer>
      <ButtonContainer>
        <ButtonComponent
          title="View Confirmed Orders"
          onPress={() => navigation.navigate("ConfirmedOrders")}
          background={colors.buttonColors.tertiary}
        />
      </ButtonContainer>
    </MainContainer>
  );
};
