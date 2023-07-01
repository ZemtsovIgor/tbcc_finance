import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import { Flex, Skeleton } from '../../../../uikit'
import Timer from './Timer'
import useNextEventCountdown from "../../hooks/useNextEventCountdown";

interface CountdownProps {
  nextEventTime: number
}

const Countdown: React.FC<CountdownProps> = ({ nextEventTime }) => {
  const secondsRemaining = useNextEventCountdown(nextEventTime)
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

  return (
    <>
      {secondsRemaining ? (
        <Flex display="inline-flex" justifyContent="flex-end" alignItems="flex-end">
          <Timer
            minutes={minutes + 1} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
            seconds={seconds}
          />
        </Flex>
      ) : (
        <Skeleton height="41px" width="250px" />
      )}
    </>
  )
}

export default Countdown
