import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {AppBody} from "components/App";
import BigNumber from "bignumber.js";

import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Text, Grid, useMatchBreakpoints} from "../../../../uikit";
import {StyledBtn} from "../../../Swap/styles";
import {getBalanceNumber} from "../../../../utils/formatBalance";

const Title = styled(Text)`
  font-weight: 600;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
  color: #FFFFFF;
  margin-top: -5px;

  @media (max-width: 968px) {
    font-size: 28px;
    line-height: 40px;
  }
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 3px;
`
const WhiteText = styled(Text)`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF;
  margin-top: 6px;
`
const InfoCard = styled(Flex)`
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MainCardEmpty = styled(Flex)`
  width: 100%;
  height: auto;
`

interface MainCardProps {
  img: ReactNode,
  title: string,
  quantity: number,
  floorPrice: number,
  totalVolume: number,
  items: number,
  owners: number,
  href: string
}

export const MainCard = ({img, title, quantity, floorPrice, totalVolume, items, owners, href}
                           : MainCardProps) => {

  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isTablet || isMobile

  const countOfItems = items >= 1000 ? `${Math.floor(items / 1000000)}M` : items

  return (
    <AppBody maxWidth='100%'>
      <Flex
        width='100%'
        flexDirection='column'
        alignItems='center'
        p={isSmall ? '40px 20px 46px' :'30px 50px 40px'}
      >
        {img}
        <Title>
          {t(title)}
        </Title>
        <Text fontSize='20px' color='rgba(255, 255, 255, 0.4)'>
          {t('Quantity')}:&nbsp;
          <span style={{color: '#FFF'}}>
          {/* {quantity.toLocaleString('en-EN', {minimumFractionDigits: 2})} */}
          {quantity}
        </span>
        </Text>
        <Grid
          width='100%'
          mt={isSmall ? '25px' : '25px'}
          gridTemplateColumns='repeat(2, 1fr)'
          gridGap={isSmall ? '14px' : '12px'}
        >
          <InfoCard>
            <WhiteText>
              {Number(getBalanceNumber(new BigNumber(floorPrice))).toFixed(3)}
            </WhiteText>
            <SecondaryText>
              {t('Floor price')}
            </SecondaryText>
          </InfoCard>
          <InfoCard>
            <WhiteText>
              {totalVolume}
            </WhiteText>
            <SecondaryText>
              {t('Total volume')}
            </SecondaryText>
          </InfoCard>
          <InfoCard>
            <WhiteText>
              {countOfItems}
            </WhiteText>
            <SecondaryText>
              {t('Items')}
            </SecondaryText>
          </InfoCard>
          <InfoCard>
            <WhiteText>
              {owners}
            </WhiteText>
            <SecondaryText>
              {t('Owners')}
            </SecondaryText>
          </InfoCard>
        </Grid>
        <Link
          to={href}
          style={{
            display: 'block',
            marginTop: isSmall ? '20px' : '31px',
            width: '100%'
          }}
        >
          <StyledBtn
            style={{height: '60px', width: '100%'}}
          >
            {t('Claim Reward')}
          </StyledBtn>
        </Link>

      </Flex>
    </AppBody>
  )
}
