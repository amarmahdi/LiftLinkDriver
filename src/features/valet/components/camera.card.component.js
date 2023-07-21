import React from "react"
import styled from "styled-components/native"
import { CardComponent } from "../../../components/utils/card.component"
import CameraIcon from "../../../../assets/svgs/camera"
import { Spacer } from "../../../components/utils/spacer.component"

const Caption = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.darkText.inverse};
`

const CustomCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const CamCardComponent = ({ children, caption }) => {
  return (
    <CardComponent overrideChildren={true}>
      <CustomCard>
        <CameraIcon width={70} height={70} />
        {caption && <>
          <Spacer variant="bottom.medium" />
          <Caption>{caption}</Caption>
        </>
        }
      </CustomCard>
    </CardComponent>
  )
}