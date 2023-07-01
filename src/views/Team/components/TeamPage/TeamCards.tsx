import React from 'react';
import styled from "styled-components";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Pagination} from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Page from '../../../Page'
import {Box, Button, Flex, Heading, useMatchBreakpoints} from "../../../../uikit";
import {useTranslation} from "../../../../contexts/Localization";
import Discord from "../../../../uikit/components/Svg/Icons/DiscordIcon";
import LickedIn from "../../../../uikit/components/Svg/Icons/LikedInIcon";
import TelegramIcon from "../../../../uikit/components/Svg/Icons/TelegramIcon";
import Footer from "../../../../uikit/components/Footer";



const Container = styled(Flex)`
  width: 100%;
  max-width: 1640px;
  margin: 0 auto;
  justify-content: center;
  @media (min-width: 1640px) {
    padding: 0;
    justify-content: center;
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
  justify-content: center;

`

const StyledHeading = styled(Heading)<{isMobile?: boolean}>`
  font-size:${({isMobile})=> isMobile? '36px':'56px'};
  font-weight:600;
  display: flex;
  justify-content: center;
  color: #FFF;
  line-height: 1em;
 
`

export const StyledCard = styled(Button)<{ isMobile: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 6px;
  padding: 12px 12px 12px 12px;
  cursor: pointer;
`
const BackIcons = styled(Box)<{ isMobile: boolean }>`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  gap: 25px;
  margin-top: 22px;
`

const Subtitle = styled.div`
  font-size: 18px;
  font-weight: 300;
  opacity: 0.6;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;

`

const SubDtitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`

const FirstLine = styled(Flex)<{ isMobile: boolean }>`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  margin-top: 25px;
`

const SecondLine = styled(Flex)<{ isMobile: boolean }>`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
  margin-top: 25px;
`

const ResponsiveGrid = styled.div<{ isMobile: boolean }>`
  background: transparent;
  padding: 30px 70px 60px 70px;
  justify-content: center;
`

const Shadow = styled.div`
  width: 186px;
  height: 30px;
  background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(38, 38, 38, 0) 100%);
  margin-bottom: 20px;
`

const TeamList = [
  {
    title: 'AT',
    description:'CEO',
    img: '/images/TeamPage/AT.png',
    width: '150px'
  },
  {
    title: 'Sergey',
    description:'COO',
    img: '/images/TeamPage/Sergey.png',
    width: '150px'
  },
  {

    title: 'Vladimir',
    description:'Back-end Developer',
    img: '/images/TeamPage/Vladimir.png',
    width: '150px'
  },
  {
    title: 'Kirill',
    description:'Front-end Developer',
    img: '/images/TeamPage/Kirill.png',
    width: '150px'
  },
  {

    title: 'Alexei',
    description:'Mobile Developer',
    img: '/images/TeamPage/Alexei.png',
    width: '150px'
  },
  {

    title: 'Victoria',
    description:'Graphic Designer',
    img: '/images/TeamPage/Victoria.png',
    width: '150px'
  },
  {

    title: 'Denys',
    description:'UI/UX Designer',
    img: '/images/TeamPage/Denys.png',
    width: '150px'
  },
]

const TeamCards = () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { t } = useTranslation()
  SwiperCore.use([Pagination])
  const FirstContain = () => {
    return(
      <FirstLine isMobile={isMobile}>
        <ResponsiveGrid isMobile={isMobile}>
       <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/AT.png"
              alt=''
              style={{
                width: ( '150px'),
                height: ( '150px'),
                borderRadius:"50%",
                marginBottom:"20px"
              }}
            />

          </Flex>
         <Box>
           <Shadow/>
         </Box>
        <SubDtitle>AT</SubDtitle>
          <Subtitle>CEO</Subtitle>
          <BackIcons isMobile>
          <StyledCard isMobile>
            <Flex justifyContent="center">
              <Discord/>
            </Flex>

          </StyledCard>
          <StyledCard isMobile>
            <Flex justifyContent="center">
              <LickedIn/>
            </Flex>

          </StyledCard>
          <StyledCard isMobile>
            <Flex justifyContent="center">
              <TelegramIcon/>
            </Flex>

          </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/Sergey.png"
              alt=''
              style={{
                width: ( '150px'),
                height: ( '150px'),
                borderRadius:"50%",
                marginBottom:"20px"
              }}
            />
          </Flex>
            <Box>
              <Shadow/>
            </Box>
          <SubDtitle>Sergey</SubDtitle>
          <Subtitle>COO</Subtitle>
          <BackIcons isMobile>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <Discord/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <LickedIn/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <TelegramIcon/>
              </Flex>

            </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
      </FirstLine>

    )
  }
  const SecondContain = () => {
    return(
      <SecondLine isMobile={isMobile}>
        <ResponsiveGrid isMobile={isMobile}>
          <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/Vladimir.png"
              alt=''
              style={{
                width: ( '120px'),
                height: ( '120px'),
                borderRadius:"50%",
                marginBottom:"20px"

              }}
            />
          </Flex>
            <Box>
              <Shadow/>
            </Box>
          <SubDtitle>Vladimir</SubDtitle>
          <Subtitle>Back-end Developer</Subtitle>
          <BackIcons isMobile>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <Discord/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <LickedIn/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <TelegramIcon/>
              </Flex>

            </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/Kirill.png"
              alt=''
              style={{
                width: ( '120px'),
                height: ( '120px'),
                borderRadius:"50%",
                marginBottom:"20px"

              }}
            />
          </Flex>
            <Box>
              <Shadow/>
            </Box>
          <SubDtitle>Kirill</SubDtitle>
          <Subtitle>Front-end Developer</Subtitle>
          <BackIcons isMobile>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <Discord/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <LickedIn/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <TelegramIcon/>
              </Flex>

            </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/Alexei.png"
              alt=''
              style={{
                width: ( '120px'),
                height: ( '120px'),
                borderRadius:"50%",
                marginBottom:"20px"

              }}
            />
          </Flex>
            <Box>
              <Shadow/>
            </Box>
          <SubDtitle>Alexei</SubDtitle>
          <Subtitle>Mobile Developer</Subtitle>
          <BackIcons isMobile>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <Discord/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <LickedIn/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <TelegramIcon/>
              </Flex>

            </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
      </SecondLine>

    )
  }
  const ThirdContain = () => {
    return(
      <FirstLine isMobile={isMobile}>
        <ResponsiveGrid isMobile={isMobile}>
          <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/Victoria.png"
              alt=''
              style={{
                width: ( '120px'),
                height: ( '120px'),
                borderRadius:"50%",
                marginBottom:"20px"

              }}
            />
          </Flex>
            <Box>
              <Shadow/>
            </Box>
          <SubDtitle>Victoria</SubDtitle>
          <Subtitle>Graphic Designer</Subtitle>
          <BackIcons isMobile>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <Discord/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <LickedIn/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <TelegramIcon/>
              </Flex>

            </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
        <ResponsiveGrid isMobile={isMobile}>
          <Flex flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <img
              src="/images/TeamPage/Denys.png"
              alt=''
              style={{
                width: ( '120px'),
                height: ( '120px'),
                borderRadius:"50%",
                marginBottom:"20px"

              }}
            />
          </Flex>
            <Box>
              <Shadow/>
            </Box>
          <SubDtitle>Denys</SubDtitle>
          <Subtitle>UI/UX Designer</Subtitle>
          <BackIcons isMobile>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <Discord/>
              </Flex>

            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <LickedIn/>
              </Flex>
            </StyledCard>
            <StyledCard isMobile>
              <Flex justifyContent="center">
                <TelegramIcon/>
              </Flex>

            </StyledCard>
          </BackIcons>
          </Flex>
        </ResponsiveGrid>
      </FirstLine>

    )
  }
  return (
    <Page>
      <Container>
        <PageContainer>
          <HeaderContainer>
            <StyledHeading
              
              id="team-title"
              isMobile={isMobile}
            >
              {t('Meet the Team')}
            </StyledHeading>
          </HeaderContainer>
          <>
          {!isSmall?
          <>
            <Flex justifyContent="center">
              <FirstContain/>
            </Flex>
            <Flex justifyContent="center">
              <SecondContain/>
            </Flex>
            <Flex justifyContent="center">
              <ThirdContain/>
            </Flex>
          </>
            :<Swiper
              effect="slide"
              centeredSlides
              slidesPerView={1}
              pagination={{
                clickable: true
          }}
              className="MobileTeamContainer"
              // spaceBetween={20}
            >
              {TeamList.map((el ) => {
                return (
                  <SwiperSlide>
                    <Flex flexDirection='column' width='100vw' alignItems='center' mt="40px" key={el.title} >
                      <Box>
                        <img src={el.img} width={el.width} height='auto' alt='' style={{
                          borderRadius:"50%",
                          marginBottom:"15px",
                        }}/>

                      </Box>
                      <Box>
                        <Shadow/>
                      </Box>
                      <SubDtitle style={{ textAlign: 'center' }}>
                        {t(el.title)}
                      </SubDtitle>
                      <Subtitle style={{ textAlign: 'center' }}>
                        {t(el.description)}
                      </Subtitle>
                      <BackIcons isMobile>
                        <StyledCard isMobile>
                          <Flex justifyContent="center">
                            <Discord/>
                          </Flex>
                        </StyledCard>
                        <StyledCard isMobile>
                          <Flex justifyContent="center">
                            <LickedIn/>
                          </Flex>
                        </StyledCard>
                        <StyledCard isMobile>
                          <Flex justifyContent="center">
                            <TelegramIcon/>
                          </Flex>
                        </StyledCard>
                      </BackIcons>
                    </Flex>

                  </SwiperSlide>
                )
                })}
            </Swiper>
          }
        </>
        </PageContainer>
      </Container>
      <Box width='100%' p={isSmall && '0 15px'}>
        <Footer center/>
      </Box>
    </Page>
  );
};

export default TeamCards;
