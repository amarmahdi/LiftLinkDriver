/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { LabelComponent as Label } from '../../../components/typography/label.component'
import { MainContainer } from '../../../components/main.container.component'
import { Spacer } from '../../../components/utils/spacer.component'
import { CarComponent } from '../components/car'
import { ButtonComponent } from '../../../components/button.component'
import styled from 'styled-components/native'
import ListIcon from '../../../../assets/svgs/listIcon'
import { ValetContext } from '../../../infrastructure/service/valet/context/valet.context'
import { MultilineInputComponent } from '../components/multiline.input.component'
import { InputComponent } from '../../../components/input.component'

const CarContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const InfoContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`

const ElementsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const ListIconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
`

export const ValetCarInfoScreen = ({ navigation }) => {
  const { defects } = useContext(ValetContext)

  const normalize = (string) => {
    const str = string.replace(/([A-Z])/g, ' $1')
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <MainContainer>
      <ScrollViewContainer>
        <Spacer variant="top.large" />
        <InfoContainer>
          <Label title={true}>Genesis Model G90 2023</Label>
          <Label title2={true}>Four wheel drive</Label>
        </InfoContainer>
        <Spacer variant="top.large" />
        <CarContainer>
          <CarComponent width={225} height={520} />
          <Spacer variant="top.large" />
          <Label>Select the area of deffect(s) on the vehicle </Label>
        </CarContainer>
        <Spacer variant="top.large" />
        <ElementsContainer>
          <Label>Noted External Defects</Label>
          <Spacer variant="top.medium" />
          {
            defects.map((defect, index) => (
              <>
                <ListIconContainer>
                  <ListIcon width={20} height={20} />
                  <Spacer variant="left.small" />
                  <Label key={index}>{normalize(defect)}</Label>
                </ListIconContainer>
                <Spacer variant="top.small" />
              </>
            ))
          }
          <Spacer variant="top.large" />
          <Label>Noted Internal Defects</Label>
          <Spacer variant="top.large" />
          <Label>Comment:</Label>
          <Spacer variant="top.small" />
          <MultilineInputComponent />
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <Label>Noted Internal Defects</Label>
          <Spacer variant="top.large" />
          <Label>Gas Level:</Label>
          <Spacer variant="top.small" />
          <InputComponent placeholder="Enter the Gas Level" />
          <Spacer variant="top.large" />
          <Label>ODO:</Label>
          <Spacer variant="top.small" />
          <InputComponent placeholder="Enter the ODOMeter " />
          <Spacer variant="top.large" />
          <ButtonComponent title="Next" onPress={() => navigation.navigate('Map')} />
        </ElementsContainer>
      </ScrollViewContainer>
    </MainContainer>
  )
}
