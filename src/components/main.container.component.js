/* eslint-disable react/prop-types */
import React from 'react'
import { Container } from './utils/container.component'
import styled from 'styled-components/native'
import Menu from '../../assets/svgs/menu'
import { Spacer } from './utils/spacer.component'
import { View, ImageBackground } from 'react-native'
import { tr } from 'date-fns/locale'
import { AvatarComponent } from './utils/avatar.component'

const BodyTitleSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    width: 100%;
`

const LogoSection = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
  margin-right: 0px;
`

const LogoTextLight = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
`

const LogoTextDark = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`

const HeaderBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  width: 100%;
  height: 180px;
  flex-direction: row;
  z-index: 1;
`

export const MainContainer = ({
  children,
  title = 'Enhance the Luxury Evolution.',
  showMenu = false,
  showLogo = false,
  showGreetings = false,
  showAvatar = false,
  styles
}) => {
  return (
    <Container styles={styles}>
      <HeaderBackground>
        {showLogo && <BodyTitleSection>
          <LogoSection>
            {/* <Logo width={32} height={30} /> */}
            <LogoTextLight>Lift</LogoTextLight>
            <LogoTextDark>Link</LogoTextDark>
          </LogoSection>
        </BodyTitleSection>}

        {showAvatar && <AvatarComponent showGreetings={showGreetings} fullName='Amar Mahdi' />}
        {showMenu && <Menu width={32} height={32} />}
      </HeaderBackground>
      {children}
    </Container>
  )
}
