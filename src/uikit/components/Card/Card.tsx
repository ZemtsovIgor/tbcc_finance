import React from 'react'
import { StyledCard, StyledCardInner } from './StyledCard'
import { CardProps } from './types'

const Card: React.FC<CardProps> = ({ ribbon, children, background, borderRadius,  ...props }) => {
  return (
    <StyledCard {...props}>
      <StyledCardInner background={background} hasCustomBorder={!!props.borderBackground} borderRadius={borderRadius}>
        {ribbon}
        {children}
      </StyledCardInner>
    </StyledCard>
  )
}
export default Card
