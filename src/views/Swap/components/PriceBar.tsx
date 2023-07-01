import React from "react";
import SwiperCore, {
  Autoplay, Pagination
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Flex, Text } from "../../../uikit";
import { CurrencyLogo } from '../../../components/Logo';
import { formatAmount } from "../utils/formatInfoNumbers";

type PriceElement = {
  currency: any,
  price: number,
  change: number
}

interface PriceBarProps {
  priceList: PriceElement[]
}

export const PriceBar = ({priceList}: PriceBarProps) => {

  SwiperCore.use([Autoplay, Pagination])

  return (
    <>
    <Swiper
      effect='slide'
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
      }}
      slidesPerView='auto'
      className="pricesSlider"
      loop
      loopedSlides={priceList.length}
      speed={7000}
    >
      {
        priceList.map((curr) => {
          return (
            <SwiperSlide key={`${curr.currency.symbol}-${curr.price}-${curr.change}`} style={{width: 'fit-content'}}>
              <Flex p='0 18px'>
                <CurrencyLogo currency={curr.currency}/>
                <Text ml='7px' fontSize='16px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
                  {curr.currency.symbol}
                </Text>
                <Text ml='7px' fontSize='16px' fontWeight='500' color='#FFF'>
                  ${formatAmount(curr.price, { notation: 'standard' })}
                </Text>
                <Text ml='9px' fontSize='16px' fontWeight='500' color={curr.change < 0 ? '#FF4FAE' : '#56BCA0'}>
                  {curr.change < 0 ? '▼' : '▲'}&nbsp;{formatAmount(curr.change, { notation: 'standard' })}%
                </Text>
              </Flex>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
    </>
  )
}
