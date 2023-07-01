import React, {FC} from "react";
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import { Flex, Text } from "../../../../uikit";


const Card = styled(Flex)`
  width: 100%;
  height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(11px);
  border-radius: 24px;
  position: relative;
`
const CurrentCard = styled(Text)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  backdrop-filter: blur(11px);
  border-radius:8px 8px  0px 0px ;
  font-weight: 500;
  font-size: 14px;
  color: #FFFFFF;
  padding: 1px 15px;
`
const WeekText = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`
const PriceText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  color: #FFFFFF;
`

interface WeekCardProps {
  week: number,
  price: number,
  current?: boolean
}

export const WeekCard: FC<WeekCardProps> = ({week, price, current}) => {

  const { t } = useTranslation()

  return (
    <Card>
      <WeekText>
        {week}&nbsp;{t('week')}
      </WeekText>
      <PriceText>
        ${price}
      </PriceText>
      {
        current && <CurrentCard>{t('Current price')}</CurrentCard>
      }
    </Card>
  )
}