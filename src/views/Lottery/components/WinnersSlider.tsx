import React from "react";
import styled from "styled-components";
import SwiperCore, {
  Autoplay, Pagination
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import {Flex, Box, useMatchBreakpoints} from "../../../uikit"
import {useTranslation} from "../../../contexts/Localization";

export const WinnersSlider = () => {

  const {t} = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  SwiperCore.use([Autoplay, Pagination])

  return (
    <>
      <Container>
        <Title>
          {t('Luckiest winners')}:
        </Title>
      </Container>
      {!isSmall ? <Swiper
        effect='slide'
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        slidesPerView='auto'
        className="winnersSlider"
        loop
        loopedSlides={winnersList.length}
        speed={7000}>
        {winnersList.map((el) => {
          return (
            <SwiperSlide style={{width: 'fit-content'}} key={el.wallet}>
              <WinnerCard>
                {el.wallet.slice(0, 6)}...
                ✌🤑🥇
                {t('won')}&nbsp;$
                {el.prize.toLocaleString("en-EN")}
                {t(' with %amount% tickets', { amount: el.tickets })}
              </WinnerCard>
            </SwiperSlide>
          )
        })}
      </Swiper>
      :
        <Swiper
          effect='slide'
          slidesPerView={1}
          centeredSlides
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          className="MobileWinnersSlider"
          spaceBetween={20}
        >
          {winnersList.map((el) => {
            return (
              <SwiperSlide style={{width: '100vw', padding: '0 15px'}} key={el.wallet}>
                <WinnerCard>
                  {el.wallet.slice(0, 6)}...
                  ✌🤑🥇
                  {t('won')}&nbsp;$
                  {el.prize.toLocaleString("en-EN")}
                  {t(' with %amount% tickets', { amount: el.tickets })}
                </WinnerCard>
              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </>
  )
}

const Container = styled(Flex)`
  width: 100%;
  max-width: 1100px;
  justify-content: flex-start;
  margin-bottom: 34px;

  @media (max-width: 968px) {
    margin-top: 100px;
    justify-content: center;
    margin-bottom: 29px;
  }
`

// const emojiList = {
//   first: ['✌', '✨', '💸'],
//   second: ['🤑', '🥳', '🤯'],
//   third: ['🥇', '🥈', '🥉']
// }

const WinnerCard = styled(Flex)`
  height: 75px;
  padding: 0 19px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  font-weight: 500;
  font-size: 18px;
  color: #FFF;
  margin: 0 18px;

  @media (max-width: 968px) {
    font-size: 15px;
    height: 65px;
    border-radius: 12px;
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }
`
const Title = styled(Box)`
  font-weight: 600;
  font-size: 20px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 968px) {
    
  }
`

const winnersList = [
  {
    wallet: '0x458D143eDae399A8C237E6711d9266A7A09ddb53',
    prize: 2669,
    tickets: 32
  },
  {
    wallet: '0x458D143eDae399A8C6711d9266A7A09ddb53',
    prize: 5443,
    tickets: 25
  },
  {
    wallet: '0x45D143eDae399A8C37E6711d927A09ddb53',
    prize: 1698,
    tickets: 14
  },
  {
    wallet: '0x458D143ae399C6711d9266A7A09ddb53',
    prize: 2311,
    tickets: 25
  },
  {
    wallet: '0x458143eDae399A8C6711d9266AA09ddb53',
    prize: 3432,
    tickets: 25
  },
  {
    wallet: '0x58D143eDae399AC6711d9266AA09ddb53',
    prize: 4232,
    tickets: 25
  }
]
