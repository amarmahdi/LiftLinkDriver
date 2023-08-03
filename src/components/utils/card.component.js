import React from "react";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { DateComponent } from "../typography/date.component";
import { TimeComponent } from "../typography/time.component";
import { Spacer } from "./spacer.component";
import DestinationIcon from "../../../assets/svgs/destinationIcon";
import PickupIcon from "../../../assets/svgs/pickupIcon";

const CardItem = styled(Card)`
	width: ${(props) => props.width || "100%"};
	height: ${(props) => props.height || "260px"};
	margin-bottom: ${(props) => props.theme.space[3]};
	padding: ${(props) => props.theme.space[3]};
	background-color: ${(props) => props.theme.colors.formDarkColors.primary};
	border-radius: ${(props) => props.theme.borderRadiuses[3]};
	`;

const DateTimeContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-self: flex-start;
	width: 100%;
`;

const ContentView = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: ${props => props.alignItems || "flex-start"};
	align-self: flex-start;
`;

const Title = styled.Text`
	color: ${(props) => props.theme.colors.darkText.inverse};
	font-size: ${(props) => props.theme.fontSizes.caption};
	font-family: ${(props) => props.theme.fonts.title};
`;

const Name = styled.Text`
	color: ${(props) => props.theme.colors.darkText.inverse};
	font-size: ${(props) => props.theme.fontSizes.body};
	font-family: ${(props) => props.theme.fonts.body};
`;

const ContentContainer = styled.View`
	flex-direction: row;
	justify-content: ${(props) => props.justifyContent || "flex-start"};
	align-items: center;
`;

const PhoneDisplay = styled.Text`
	color: ${(props) => props.theme.colors.darkText.inverse};
	font-size: ${(props) => props.theme.fontSizes.caption};
	font-family: ${(props) => props.theme.fonts.title};
`;


/* {"
	__typename": "OrderType", 
	"assignedTo": [Object], 
	"customer": [Object], 
	"orderAddress": "58c417c7-811f-42ea-b709-a9ddbd92e453r", 
	"orderId": "75141e56-114b-4f25-8827-3374b358953f", 
	"orderStatus": "Pending", 
	"orderType": "Service", 
	"valetServiceDate": "2023-07-14"
}, */


export const CardComponent = ({ children, data = {}, size = {}, overrideChildren = false }) => {
	return (
		<CardItem height={size.height} width={size.width}>
			{!overrideChildren && <><DateTimeContainer>
				<ContentView>
					<Title>Assigned on</Title>
					<Spacer variant="top.xsmall" />
					<DateComponent date={data.valetServiceDate} />
					<TimeComponent time={data.valetServiceDate} />
				</ContentView>
				<ContentView alignItems="flex-end">
					<Title>To be delivered by</Title>
					<Spacer variant="top.xsmall" />
					<DateComponent date={data.valetServiceDate} />
					<TimeComponent time={data.valetServiceDate} />
				</ContentView>
			</DateTimeContainer>
				<Spacer variant="top.large" />
				<ContentContainer>
					<PickupIcon width={36} height={36} />
					<ContentView>
						<Title>Pickup Location</Title>
						<Spacer variant="top.xsmall" />
						<Title>{data.orderAddress}</Title>
					</ContentView>
				</ContentContainer>
				<Spacer variant="top.medium" />
				<ContentContainer>
					<DestinationIcon width={36} height={36} />
					<ContentView>
						<Title>Destination Location</Title>
						<Spacer variant="top.xsmall" />
						<Title>{data.orderAddress}</Title>
					</ContentView>
				</ContentContainer><Spacer variant="top.large" />
				<ContentContainer justifyContent="space-between">
					<Name>{data.name}</Name>
					<PhoneDisplay>{data.phone}</PhoneDisplay>
				</ContentContainer></>}
			{overrideChildren && children}
		</CardItem>
	);
}
