import React from "react"
import styled from "styled-components"
import Background from "../components/Background"
import MintModal from '../components/MintModal'
import { useTranslation } from "../../../contexts/Localization";
import { Box, useModal, useMatchBreakpoints } from "../../../uikit";

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
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left:265px;
  position: relative;
  z-index: 2;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 64px;
  margin-bottom: 20px;
`
const Subtitle = styled.div`
  font-size: 36px;
  font-weight: 400;
`
const MintBtn = styled.button`
  width: 180px;
  height: 60px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border: none;
  box-shadow: none;
  margin-top: 40px;
  cursor: pointer;
  color: #FFF;
`
const MobileContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-70px);
`
const MobileTitle = styled.div`
  font-weight: 600;
  font-size: 56px;
  text-align: center;
`
const MobileSubtitle = styled.div`
  font-size: 30px;
  font-weight: 400;
  text-align: center;
`

const TBCCNFTToken = () => {

  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const [onPresentMintModal] = useModal(<MintModal />)

  return (
    <Page isMobile={isMobile}>
      <Background />
      <img
        src={isMobile ? '/images/decorations/MobileMintImage.png':'/images/decorations/MintImage.png'}
        alt=''
        style={{
          position: (isMobile ? 'relative' : 'absolute'),
          top: (isMobile ? '' : '150px'),
          right: (isMobile ? '' : '200px'),
          pointerEvents: 'none',
          width: (isMobile ? '100vw' : '645px'),
          height: (isMobile ? 'auto' : '690px'),
          marginTop: (isMobile ? '30px' : '')
        }}
      />
      {
        isMobile ?
          (
            <MobileContainer>
              <MobileTitle>
                {t('TBCC NFT token')}
              </MobileTitle>
              <MobileSubtitle>
                {t('Quantity')}: 100 TBCC
              </MobileSubtitle>
              <MintBtn
                onClick={onPresentMintModal}
              >
                {t('Mint Now')}
              </MintBtn>
              <Box height={70}/>
            </MobileContainer>
          ) : (
            <Container>
              <Title>
                {t('TBCC NFT token')}
              </Title>
              <Subtitle>
                {t('Quantity')}: 100 TBCC
              </Subtitle>
              <MintBtn
                onClick={onPresentMintModal}
              >
                {t('Mint Now')}
              </MintBtn>
              {isMobile && <Box height={65}/>}
            </Container>
          )
      }
    </Page>
  )
}

export default TBCCNFTToken
