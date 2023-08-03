/* eslint-disable react/prop-types */
import styled from 'styled-components/native'
import { TextInput } from 'react-native-paper'
import React from 'react'

const InputField = styled(TextInput)`
    background-color: ${(props) => props.theme.colors.bg.primary};
    border-radius: ${(props) => props.theme.borderRadiuses[3]};
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.formColors.border};
    width: 100%;
`

export const InputComponent = ({ ...props }) => {
  return (
    <InputField
      mode="flat"
      activeUnderlineColor="transparent"
      selectionColor="black"
      underlineColor="transparent"
      textColor="black"
      cursorColor="black"
      secureTextEntry={props.secure}
      {...props}
    />
  )
}
