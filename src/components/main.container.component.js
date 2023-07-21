/* eslint-disable react/prop-types */
import React from 'react'
import { Container } from './utils/container.component'
import styled from 'styled-components'
// import { LabelComponent } from './typography/label.component'
import Logo from '../../assets/svgs/logo'
import Menu from '../../assets/svgs/menu'

const BodyTitleSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    padding: 10px;
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
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
`

const LogoTextDark = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`

export const MainContainer = ({ children, title = '', showMenu = false, styles }) => {
  return (
    <Container styles={styles}>
      <BodyTitleSection>
        <LogoSection>
          <Logo width={32} height={30} />
          <LogoTextLight>Lift</LogoTextLight>
          <LogoTextDark>Link</LogoTextDark>
        </LogoSection>
        {showMenu && <Menu width={24} height={24} />}
        {/* <LabelComponent title={true}>{title}</LabelComponent> */}
      </BodyTitleSection>
      {children}
    </Container>
  )
}
