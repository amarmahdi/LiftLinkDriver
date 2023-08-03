/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components/native'

const Label = styled.Text`
    color: ${(props) => props.inverted ? props.theme.colors.text.inverse : props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.fontSizes.button};
    font-family: ${(props) => props.theme.fonts.title2};
`

const Title = styled.Text`
    color: ${(props) => props.inverted ? props.theme.colors.text.inverse : props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-family: ${(props) => props.theme.fonts.title2};
`

const Title2 = styled.Text`
    color: ${(props) => props.inverted ? props.theme.colors.text.inverse : props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family: ${(props) => props.theme.fonts.date};
`

// const Title3 = styled.Text`
//     color: ${(props) => props.theme.colors.text.primary};
//     font-size: ${(props) => props.theme.fontSizes.body};
//     font-family: ${(props) => props.theme.fonts.date};
// `

export const LabelComponent = ({
  children,
  title = false,
  title2 = false,
  // title3 = false,
  inverted = false,
  styles
}) => {
  return (
    <>
      {!title && !title2 && <Label styles={styles} inverted={inverted}>
        {children}
      </Label>}
      {title && <Title inverted={inverted}>
        {children}
      </Title>}
      {title2 && <Title2 inverted={inverted}>
        {children}
      </Title2>}
    </>
  )
}
