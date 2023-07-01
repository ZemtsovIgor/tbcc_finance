import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {Flex, Heading, useMatchBreakpoints} from '../../../uikit'
import Page from '../../Page'
import BurnSwitcher from "../components/BurnSwitcher";
import BurnCard from "../BurnCard/BurnCard";
import {BurnTransaction} from "../../../state/info/types";

const StyledHeading = styled(Heading)<{isMobile?: boolean}>`
  display: flex;
  flex-direction: ${({isMobile}) => isMobile ? 'column' : 'row'};
  align-items: ${({isMobile}) => isMobile ? 'flex-start' : 'center'};
  justify-content: space-between;
  color: #FFF;
  padding: ${({isMobile}) => isMobile ? '0 7px' : '0'};
  margin-right: 40px;
  line-height: 1em;
  margin-bottom: 0;
 
`

const Container = styled(Flex)<{ isMobile?: boolean }>`
	padding-left: ${({ isMobile }) => isMobile ? '0px' : '270px'};
	padding-right: ${({ isMobile }) => isMobile ? '0px' : '30px'};
	width: 100%;
	max-width: 1640px;
	margin: 0 auto;
	justify-content: center;
	@media (min-width: 1640px) {
		padding: 0;
	}
`

const PageContainer = styled.div<{isMobile?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  margin: ${({isMobile}) => isMobile ? '0 auto' : '80px auto'};
  padding: ${({isMobile}) => isMobile ? '20px 23px' : '0'};
  padding-bottom:  ${({isMobile}) => isMobile ? '0' : '40px '};
  position: relative;
  z-index: 10;
`

const HeaderContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Overview: React.FC<{
  burnTransactions: BurnTransaction[] | undefined
}> = ({ burnTransactions }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <Page>
      <Container isMobile>
        <PageContainer>
          <HeaderContainer>
            <StyledHeading
              fontSize='36px'
              mb="16px"
              fontWeight='600'
              id="info-overview-title"
              isMobile={isMobile}
            >
              {t('Burning Hall')}
            </StyledHeading>
            <BurnSwitcher
              isActiveTab="Burn"
            />
          </HeaderContainer>
        </PageContainer>
      </Container>
      <BurnCard burnTransactions={burnTransactions || []}/>
    </Page>
  )
}

export default Overview
