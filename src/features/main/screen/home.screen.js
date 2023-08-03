/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'
import { LabelComponent } from '../../../components/typography/label.component'
import { MainContainer } from '../../../components/main.container.component'
import { Spacer } from '../../../components/utils/spacer.component'
import styled from 'styled-components/native'
import RedirectIcon from '../../../../assets/svgs/redirect'
import { Pressable } from 'react-native'
import { Card } from 'react-native-paper'

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Avatar = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`

const UsernameContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const HomeContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const Image = styled.Image`
  resize-mode: contain;
  width: 100%;
`

const ListContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const ListComponent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const CarDescription = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Line = styled.View`
  width: 95%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.text.primary};
`

const List = styled.FlatList`
  width: 100%;
`

const ListCard = styled.View`
  width: ${(props) => (props.theme.buttonSizes.screen.width) / 1.1}px;
  height: 100px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: transparent;
  background-color: ${(props) => props.theme.colors.bg.primary};
  shadow-color: ${(props) => props.theme.colors.text.primary};
  shadow-offset: 0px 1px;
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
`

const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`

export const HomeScreen = ({ navigation }) => {
  return (
    <MainContainer
      title="Amar Mahdi"
      showGreetings={true}
      showAvatar={true}
      showMenu={true}
    >
      <HomeContainer>
        <Spacer variant="top.large" />
        <LabelContainer>
          <LabelComponent>Pending order(s)</LabelComponent>
        </LabelContainer>
        <List
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={() => (
            <Pressable onPress={() => navigation.navigate('Details')}>
              <ListContainer>
                <ListCard>
                  <ListComponent>
                    <CarDescription>
                      <LabelComponent>Genesis G90</LabelComponent>
                      <LabelComponent title2={true}>Four wheel drive</LabelComponent>
                    </CarDescription>
                    <RedirectIcon width={24} height={24} />
                  </ListComponent>
                </ListCard>
              </ListContainer>
            </Pressable>
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </HomeContainer>
    </MainContainer>
  )
}
