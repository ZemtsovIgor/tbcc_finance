import React from 'react'
import styled from 'styled-components'
import { HelpIcon, useTooltip, Box, BoxProps, Placement } from '../../uikit'

interface Props extends BoxProps {
  text: string | React.ReactNode
  placement?: Placement
}

const QuestionWrapper = styled.div`
  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionHelper: React.FC<Props> = ({ text, placement = 'right-end', ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement, trigger: 'hover' })

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color="textSubtle" width="16px" />
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
