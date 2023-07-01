import React from 'react'
import { Skeleton } from '../../../../uikit'
import {WhiteText} from "./TableRow";

export interface MultiplierProps {
  multiplier: string
}

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />

  return (
    <WhiteText>
      {displayMultiplier}
    </WhiteText>
  )
}

export default Multiplier
