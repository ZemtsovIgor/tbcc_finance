import React from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import Background from "../components/Background"
import { useTranslation } from "../../../contexts/Localization";
import {Box, Flex, useMatchBreakpoints} from "../../../uikit";
import {PATHS} from "../../../config/paths";

const Page = styled.div<{isMobile?: boolean}>`
    background-color: #101428;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    color: #FFF;
    -webkit-scrollbar {
        width: ${({isMobile}) => isMobile ? '' : '0'};
        height: ${({isMobile}) => isMobile ? '' : '0'};
    }
`
const Container = styled(Flex)<{ isMobile?: boolean }>`
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
const Title = styled.div`
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 20px;
`
const Subtitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);

`
const SubDtitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  margin-left: 4px;

`
export const MintBtn = styled(Link)<{ isMobile: boolean }>`
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border: none;
  box-shadow: none;
  border-radius: 6px;
  color: #FFF;
  font-size: 16px;
  font-weight: 600;
  margin-top: 35px;
  cursor: pointer;
  align-items: center;
  width: 80%;
  margin-bottom: 40px;
`

const StyledCard = styled(Box)<{ isMobile: boolean }>`
  width: ${({ isMobile }) => isMobile ? 'calc(100% - 30px)' : '545px'};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;

`
const ChartCardsContainer = styled(Flex)<{ isMobile?: boolean }>`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: ${({ isMobile }) => isMobile ? '0 12px' : ''};
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`
const ResponsiveGrid = styled.div<{ isMobile: boolean }>`
  padding: ${({isMobile}) => isMobile ? '0px 28px 10px 28px' : '0px 65px 10px 65px'};
  border: solid 1px rgba(255, 255, 255, 0.09);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);

`
const ButtonContainer = styled(Flex)<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  margin-top: 25px;
  
  @media (max-width: 968px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
    
  }

`
const GridTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 9px;
  margin-top: 10px;
  text-align: center;
`
const GridSubtitle = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
`

const Overview = () => {

  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  const MintContain = () => {
    return(
      <ButtonContainer isMobile={isMobile}>
     <ResponsiveGrid isMobile={isMobile}>
       <GridTitle>100 TBCC</GridTitle>
       <GridSubtitle>
         {t('Floor price')}
       </GridSubtitle>
     </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <GridTitle>1000</GridTitle>
          <GridSubtitle>
            {t('Total volume')}
          </GridSubtitle>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <GridTitle>1K</GridTitle>
          <GridSubtitle>{t('Items')}</GridSubtitle>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <GridTitle>347</GridTitle>
          <GridSubtitle>{t('Owners')}</GridSubtitle>
        </ResponsiveGrid>
      </ButtonContainer>

    )
  }
  const AdminContain = () => {
    return(
      <ButtonContainer isMobile={isMobile} >
        <ResponsiveGrid isMobile={isMobile} >
          <GridTitle>0.223</GridTitle>
          <GridSubtitle>
            {t('Floor price')}
          </GridSubtitle>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <GridTitle>6.6035</GridTitle>
          <GridSubtitle>
            {t('Total volume')}
          </GridSubtitle>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <GridTitle>1K</GridTitle>
          <GridSubtitle>{t('Items')}</GridSubtitle>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <GridTitle>351</GridTitle>
          <GridSubtitle>{t('Owners')}</GridSubtitle>
        </ResponsiveGrid>
      </ButtonContainer>
    )
  }

  return (
    <Page isMobile={isMobile}>
      <Container>
        <PageContainer>
        <Background/>
      <ChartCardsContainer isMobile={isMobile}>
      <StyledCard isMobile={isMobile}>
        <Flex flexDirection={['column']} alignItems="center">
          <Flex>
            <img
              src={isMobile ? '/images/decorations/MobileMintImage.png':'/images/decorations/MintImage.png'}
              alt=''
              style={{
                width: (isMobile ? '211px' : '235px'),
                height: (isMobile ? '216px' : '230px'),
                marginTop: (isMobile ? '' : '30px')
              }}
            />
          </Flex>
          <Flex >
            <Title>
              {t('TBCC NFT Token')}
            </Title>
          </Flex>
          <Flex>
            <Subtitle>
              {t('Quantity:')}
            </Subtitle>
            <SubDtitle>
              1000
            </SubDtitle>
          </Flex>
          <Flex>
          <MintContain/>
          </Flex >
            <MintBtn
              to={PATHS.MINT_TBCC_NFT}
              isMobile={isMobile}
            >
              {t('Mint Now')}
            </MintBtn>
        </Flex>
      </StyledCard>
          <StyledCard isMobile={isMobile}>
            <Flex flexDirection={['column']} alignItems="center">
              <Flex>
                <img
                  src={isMobile ? '/images/decorations/AdminNftMobile.png':'/images/decorations/AdminImage.png'}
                  alt=''
                  style={{
                    width: (isMobile ? '' : '235px'),
                    height: (isMobile ? '' : '230px'),
                    marginTop: (isMobile ? '' : '30px')
                  }}
                />
              </Flex>
              <Flex >
                <Title>
                  {t('Admin NFT Token 2')}
                </Title>
              </Flex>
              <Flex>
                <Subtitle>
                  {t('Quantity:')}
                </Subtitle>
                <SubDtitle>
                  100.00
                </SubDtitle>
              </Flex>
              <Flex>
                <AdminContain/>
              </Flex >
              <MintBtn
                to={PATHS.MINT_TBCC_NFT}
                isMobile={isMobile}
              >
                {t('Mint Now')}
              </MintBtn>
            </Flex>
          </StyledCard>
      </ChartCardsContainer>
        </PageContainer>
      </Container>
    </Page>
  )
}

export default Overview
