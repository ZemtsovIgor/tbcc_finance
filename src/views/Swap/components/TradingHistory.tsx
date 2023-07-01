import React from "react";
import styled from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";
import { useTranslation } from "../../../contexts/Localization";
import { Flex, Grid, Text } from "../../../uikit";

const CustomGrid = styled(Grid)`
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  justify-items: center;
  align-items: center;
  height: 100%;
  min-height: 600px;
`
const GridHeaderText = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`
const CurrText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  width: 45px;
`

type HistoryItem = {
  profit: number,
  curr1: {
    name: string,
    amount: number
  },
  curr2: {
    name: string,
    amount: number
  },
  time: string
}

export const TradingHistory = ({tradeHistory}: {tradeHistory: HistoryItem[]}) => {

  const {t} = useTranslation()

  return (
    <Flex width='100%' flexDirection='column' pb='20px'>
      <Text fontSize='18px' fontWeight='600' color='#FFF' mt='15px' ml='20px' mb='10px'>
        {t('Trading history')}
      </Text>
      <CustomGrid>
        <GridHeaderText>
          {t('USD')}
        </GridHeaderText>
        <GridHeaderText>
          {t('Amount')}
        </GridHeaderText>
        <GridHeaderText>
          {t('Time')}
        </GridHeaderText>
        {
          tradeHistory.slice(0, 10).map((trade,index) => {
            return (
              <React.Fragment key={`trade-history-${trade.time}${index + 1}`}>
                <Text fontSize='14px' fontWeight='500' color={trade.profit < 0 ? '#FF4FAE' : '#56BCA0'}>
                  {/* {trade.profit < 0 ? '▼' : '▲'}&nbsp; */}
                  ${Math.abs(trade.profit).toFixed(2)}
                </Text>
                <Flex flexDirection='column'>
                  <Flex justifyContent='center'>
                    <CurrText color='#FFF' textAlign='right' mr='10px'>
                      {trade.curr1.amount.toFixed(2)}
                    </CurrText>
                    <CurrText color='rgba(255, 255, 255, 0.6)' textAlign='left'>
                      {trade.curr1.name}
                    </CurrText>
                  </Flex>
                  <Flex justifyContent='center'>
                    <CurrText color='#FFF' textAlign='right' mr='10px'>
                      {trade.curr2.amount.toFixed(2)}
                    </CurrText>
                    <CurrText color='rgba(255, 255, 255, 0.6)' textAlign='left'>
                      {trade.curr2.name}
                    </CurrText>
                  </Flex>
                </Flex>
                <Text fontSize='12px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
                  {formatDistanceToNowStrict(parseInt(trade.time, 10) * 1000)}
                </Text>
              </React.Fragment>
            )
          })
        }
      </CustomGrid>
    </Flex>
  )
}
