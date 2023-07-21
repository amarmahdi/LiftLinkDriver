/* eslint-disable react/prop-types */
import React from 'react'
import { LabelComponent as Label } from '../../../components/typography/label.component'
import { MainContainer } from '../../../components/main.container.component'
import { ScrollView } from 'react-native'
import { Spacer } from '../../../components/utils/spacer.component'
import { CamCardComponent } from '../components/camera.card.component'
import { ButtonComponent } from '../../../components/button.component'

export const ValetLoanerScreen = ({ navigation }) => {
  return (
    <MainContainer title="Service Details">
      <Spacer variant="top.large" />
      <Label title2={true}>Loaner Car: All Side Picture</Label>
      <Spacer variant="top.medium" />
      <ScrollView>
        <CamCardComponent caption="Left Side" />
        <Spacer variant="right.medium" />
        <CamCardComponent caption="Front Side" />
        <Spacer variant="right.medium" />
        <CamCardComponent caption="Right Side" />
        <Spacer variant="right.medium" />
        <CamCardComponent caption="Rare Side" />
        <Spacer variant="right.medium" />
        <ButtonComponent title="Next" onPress={() => navigation.navigate('ValetCarInfo')} />
      </ScrollView>
    </MainContainer>
  )
}
