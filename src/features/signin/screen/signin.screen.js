/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { LabelComponent } from '../../../components/typography/label.component'
import { LabelFormComponent } from '../../../components/typography/label.form.component'
import { Spacer } from '../../../components/utils/spacer.component'
import { InputComponent } from '../../../components/input.component'
import { ButtonComponent } from '../../../components/button.component'
import { AuthContext } from '../../../infrastructure/service/authentication/context/auth.context'
import { MainContainer } from '../../../components/main.container.component'
import styled from 'styled-components/native'
import LogOutIcon from '../../../../assets/svgs/logout'

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 0px 20px;
`

const ButtonContainer = styled.View`
  padding: 20px;
  width: 100%;
`

export const SigninScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { onLogin } = useContext(AuthContext)

  return (
    <>
      <MainContainer>
        <Container>
          <LabelComponent title={true}>Sign In</LabelComponent>
          <Spacer variant="top.medium" />
          <Spacer variant="top.medium" />
          <LabelFormComponent size={'100%'}>Username</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Spacer variant="top.small" />
          <Spacer variant="top.small" />
          <LabelFormComponent>Password</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={password}
            onChangeText={text => setPassword(text)}
            secure
          />
          <Spacer variant="top.xsmall" />
          <LabelFormComponent size="small" >Forgot Password?</LabelFormComponent>
          <Spacer variant="top.medium" />
          <Spacer variant="top.medium" />
        </Container>
        <ButtonContainer>
          <ButtonComponent
            title="Sign In"
            padding="10px"
            onPress={() => onLogin(username, password)}
            icon={<LogOutIcon width={24} height={24} />}
          />
        </ButtonContainer>
      </MainContainer>
    </>
  )
}
