import React from 'react';
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import { Flex, Text} from "../../../../uikit";

const CardContainer = styled(Flex)`
  width: 300px;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  overflow: hidden;
`
const CardHeader = styled(Flex)`
  width: 100%;
  height: 98px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  backdrop-filter: blur(5px);
`
const CardBody = styled(Flex)`
  width: 100%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 29px 35px 40px 35px;
`
const Square = styled(Flex)`
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
`
const Row = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`
const BigText = styled(Text)`
  font-weight: 600;
  font-size: 28px;
  color: #FFFFFF;
`

interface TariffCardProps {
  percent: string,
  numbers: string[],
  reward: number,
  refferalForInvite: number,
  refferalOnReward: number,
  greenGameDonation: number
}

const TariffCard: React.FC<TariffCardProps> = ({percent, numbers, reward, refferalOnReward, refferalForInvite, greenGameDonation}) => {

  const { t } = useTranslation()

  return (
    <CardContainer>
      <CardHeader>
        <Text fontSize='18px' fontWeight='500' color='#FFF' textAlign='center'>
          {
            percent !== 'Unlimited'
            ? <>
                {t('Up to')}&nbsp;
                <span style={{fontSize: '28px'}}>{percent}%</span>
                <br/>
                {t('of each table value')}
              </>
            : <span style={{fontSize: '28px'}}>{t('Unlimited')}</span>
          }
        </Text>
      </CardHeader>
      <CardBody>
        <Flex alignItems='center' justifyContent='center' style={{gridGap: '17px'}}>
          {numbers.map((el) => {
            return (
              <Square key={el}>
                {el}
              </Square>
            )
          })}
        </Flex>
        <Row>
          <SecondaryText>
            {t('Reward')}
          </SecondaryText>
          <BigText>
            {reward}%
          </BigText>
        </Row>
        <Row>
          <SecondaryText>
            {t('Referral for Invite')}
          </SecondaryText>
          <BigText>
            {refferalForInvite}%
          </BigText>
        </Row>
        <Row>
          <SecondaryText>
            {t('Referral on Reward')}
          </SecondaryText>
          <BigText>
            {refferalOnReward}%
          </BigText>
        </Row>
        <Row>
          <SecondaryText>
            {t('Game Donation')}
          </SecondaryText>
          <BigText>
            {greenGameDonation}%
          </BigText>
        </Row>
      </CardBody>
    </CardContainer>
  );
};

export default TariffCard;
