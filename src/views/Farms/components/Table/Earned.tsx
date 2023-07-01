import React from 'react'
import {Skeleton, Text} from '../../../../uikit'

export interface EarnedProps {
  earnings: number
  pid?: number
}

interface EarnedPropsWithLoading extends EarnedProps {
  userDataReady: boolean
}

const Earned: React.FunctionComponent<EarnedPropsWithLoading> = ({ earnings, userDataReady }) => {
  if (userDataReady) {
    return <Text fontSize='16px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
      {earnings.toLocaleString()}
    </Text>
  }
  return (
    <Text fontSize='16px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
      <Skeleton width={60} />
    </Text>
  )
}

export default Earned
