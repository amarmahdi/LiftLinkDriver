/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'
import { LabelComponent } from '../../../components/typography/label.component'
import { MainContainer } from '../../../components/main.container.component'
import { Spacer } from '../../../components/utils/spacer.component'
import styled from 'styled-components'
import RedirectIcon from '../../../../assets/svgs/redirect'
import { Pressable } from 'react-native'

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
  padding: 10px;
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

export const HomeScreen = ({ navigation }) => {
  return (
    <MainContainer title="Home" showMenu={true}>
      <HomeContainer>
        <Spacer variant="top.large" />
        <AvatarContainer>
          <Avatar />
          <Spacer variant="left.medium" />
          <UsernameContainer>
            <LabelComponent>Hello,</LabelComponent>
            <LabelComponent title={true}>Amar</LabelComponent>
          </UsernameContainer>
        </AvatarContainer>
        <Image source={require('../../../../assets/Map.png')} />
        <LabelComponent>Pending order(s)</LabelComponent>
        <Spacer variant="top.large" />
        <List
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={() => (
            <Pressable onPress={() => navigation.navigate('Valet')}>
              <ListContainer>
                <ListComponent>
                  <CarDescription>
                    <LabelComponent>Genesis G90</LabelComponent>
                    <LabelComponent title2={true}>Four wheel drive</LabelComponent>
                  </CarDescription>
                  <RedirectIcon width={24} height={24} />
                </ListComponent>
                <Spacer variant="top.medium" />
                <Line />
                <Spacer variant="top.medium" />
              </ListContainer>
            </Pressable>
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </HomeContainer>
    </MainContainer>
  )
}
