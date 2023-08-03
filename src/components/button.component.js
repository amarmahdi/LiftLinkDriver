/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from 'react-native-paper'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import LogOutIcon from '../../assets/svgs/logout'

const StyledButton = styled(Button)`
    background-color: ${(props) => props.theme.colors.formColors.primary};
    border-radius: ${(props) => props.theme.borderRadiuses[3]};
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.brand.primary};
    height: ${(props) => props.theme.buttonSizes.xl.height};
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`

const StyledButtonText = styled.Text`
    color: ${(props) => props.theme.colors.darkText.inverse};
    font-family: ${(props) => props.theme.fonts.title};
    font-size: ${(props) => props.theme.fontSizes.buttonTitle};
`

export const ButtonComponent = ({ children, title = '', icon, ...props }) => {
  return (
    <StyledButton
      mode="contained"
      icon={() => icon && icon}
      {...props}
    >
      {title && <StyledButtonText>{title}</StyledButtonText>}
    </StyledButton>
  )
}
