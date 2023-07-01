import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { AppBody } from "components/App";
import { useTranslation } from "../../../contexts/Localization";
import { Flex, Text, Box, Grid, CheckIcon, useMatchBreakpoints } from "../../../uikit";
import {StyledCheckBox} from "../styles";
import PageSwitcher from "../../Burn/components/PageSwitcher";
import { StyledBtn } from "../../Swap/styles";
import {useNFT} from "../../../state/nft/hooks";

const Title = styled(Text)`
  font-weight: 600;
  font-size: 36px;
  color: #FFF;
  text-align: center;
  margin-top: 102px;
  margin-bottom: 23px;
  
  @media (max-width: 968px) {
    font-size: 30px;
    margin-top: 79px;
  }
`
const Header = styled(Grid)`
  width: 100%;
  height: 45px;
  grid-template-columns: repeat(3, 1fr);
  align-content: center;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding: 0 12px 0 16px;
  
  @media (max-width: 968px) {
    border: none;
    background: transparent;
    backdrop-filter: none;
    padding: 0;
  }
`
const ContentGrid = styled(Grid)`
  grid-template-columns: repeat(3, 1fr);
  align-content: center;
  height: 62px;
  width: 100%;
  padding: 0 13px 0 15px;
  
  @media (max-width: 968px) {
    padding: 0;
  }
`

const HeaderText = styled(Text)`
  font-weight: 400;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: #D9D9D9;
  opacity: 0.05;
`
const Square = styled(Flex)`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(255 255 255 / 0.08);
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
`
const CardFooter = styled(Flex)`
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255 255 255 / 0.09);
  position: relative;
`
const FooterWithClaim = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  z-index: 3;
`

const ClaimPersonal = () => {

  const { t } = useTranslation()
  const { isTablet, isMobile } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  const [activePage, setActivePage] = useState(1)
  const [claimList, setClaimList] = useState([])
  const [selected, setSelected] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const {
    nftTDAData: {
      owner,
      totalTokens
    },
  } = useNFT()


  useEffect(() => {
    if (!Number(totalTokens)) return;

    const claimData = owner.tokens.map((token) => {
      return {
        tokenId: token.id,
        reward: 1,
        claimed: false
      }
    });

    const arrWithSelected = []
    claimData.forEach((claim) => {
      const obj = Object.assign(claim, {selected: false})
      arrWithSelected.push(obj)
    })
    setClaimList(arrWithSelected)
  }, [owner, totalTokens])

  const handleChange = (event, id, index: number) => {
    if (claimList[index].selected) {
      setSelected(prev => prev.filter((el) => el !== id))
      setClaimList((prev) =>
        prev.map((el) => el.tokenId === id ? {...el, selected: false} : el)
      )
    } else {
      setSelected(prev => [...prev, id])
      setClaimList((prev) =>
        prev.map((el) => el.tokenId === id ? {...el, selected: true} : el)
      )
    }
  }

  const selectAll = () => {
    if (allSelected) {
      setSelected([])
      setClaimList((prev) => prev.map((el) => el.claimed ? el : {...el, selected: false}))
      setAllSelected(false)
    } else {
      setSelected(claimList.filter((el) => !el.claimed).map((el) => el.tokenId))
      setClaimList((prev) => prev.map((el) => el.claimed ? el : {...el, selected: true}))
      setAllSelected(true)
    }
  }

  return (
    <Flex flexDirection='column' width='100%' alignItems='center' pb='80px'>
      <Title>
        {t('Claim What’s Yours')}
      </Title>
      <AppBody maxWidth='560px'>
        <Box
          width='100%'
          p={isSmall ? '30px 20px 0' : '20px 20px 0'}>
          <Text
            fontWeight='600'
            fontSize='20px'
            color='#FFF'
            pl={isSmall ? '0' : '17px'}
            mb='7px'>
            {t('Rewards')}
          </Text>
          <Text fontSize='14px' color='rgba(255 255 255 / 0.4)' pl={isSmall ? '0' : '17px'}>
            {t('Please note that you are charged a fee for each transaction.')}
          </Text>
          <Header mt={isSmall ? '13px' : '26px'} mb={isSmall ? '0' : '20px'}>
            <HeaderText>
              {t('Token ID')}
            </HeaderText>
            <HeaderText ml='8px'>
              {t('Reward')}
            </HeaderText>
            <Flex width='100%' justifyContent='flex-end'>
              <HeaderText mr='12px'>
                {t('Select all')}
              </HeaderText>
              <StyledCheckBox
                checked={allSelected}
                onChange={selectAll}
              />
            </Flex>
          </Header>
          { claimList && claimList.length > 0 ?
            claimList
              .slice((activePage - 1) * 10, activePage * 10)
              .map((claim, index) => {
              return (
                <React.Fragment key={`tokenId - ${claim.tokenId}`}>
                  <ContentGrid>
                    <Text fontSize='14px' color='#FFF'>
                      {claim.tokenId}
                    </Text>
                    <Text fontWeight='500' fontSize='14px' color='#FFF' ml='8px'>
                      {claim.reward}&nbsp;TBCC
                    </Text>
                    <Flex width='100%' justifyContent='flex-end' alignItems='center'>
                      {
                        !claim.claimed
                          ? <>
                            <Text fontWeight='500' fontSize='14px' color='#56BCA0' mr='12px'>
                              {t('Claim!')}
                            </Text>
                          <StyledCheckBox
                            checked={claimList[index + (10 * (activePage - 1))].selected}
                            onChange={(e) => handleChange(e, claim.tokenId, index + (10 * (activePage - 1)))}
                          />
                          </>
                          : <>
                            <Text fontWeight='500' fontSize='14px' color='rgba(255 255 255 / 0.45)' mr='12px'>
                              {t('Claimed')}
                            </Text>
                            <Square>
                              <CheckIcon/>
                            </Square>
                          </>
                      }
                    </Flex>

                  </ContentGrid>
                  {
                    index !== 9 &&
                    <Line/>
                  }
                </React.Fragment>
              )
            }) : (
              <Flex flexDirection="column" paddingBottom="20px">
                <Text fontWeight='500' fontSize='14px' color='rgba(255 255 255 / 0.45)' mr='12px' textAlign="center">
                  {t("You don't have nft for claim yet")}
                </Text>
              </Flex>
            )
          }
        </Box>
        <CardFooter>
          <Flex
            width='100%'
            height='100%'
            alignItems='center'
            justifyContent='center'
            style={{filter: selected.length > 0 ? 'blur(5px)' : 'none'}}
          >
            <PageSwitcher
              activePage={activePage}
              maxPages={Math.ceil(owner.tokens.length) / 10}
              setPage={(index) => setActivePage(index)}/>
          </Flex>
          {
            selected.length > 0 && <FooterWithClaim>
            <Box>
              <Text fontWeight='600' fontSize='20px' color='#FFF'>
                {t('Claim')}&nbsp;({selected.length})&nbsp;{t('drops')}
              </Text>
              <Text fontSize='14px' color='rgba(255, 255, 255, 0.4)'>
                {t('Gas fee not included')}
              </Text>
            </Box>
            <StyledBtn style={{height: '45px'}} disabled>
              {t('Claim Now')}
            </StyledBtn>
          </FooterWithClaim>
          }
        </CardFooter>
      </AppBody>
    </Flex>
  )
}

export default ClaimPersonal
