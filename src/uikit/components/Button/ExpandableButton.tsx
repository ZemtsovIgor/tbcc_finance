import React from 'react'
import {ChevronDownIcon, ChevronUpSecondIcon} from '../Svg'
import IconButton from './IconButton'
import {Text} from "../Text";
import {Flex} from "../Box";
import {useTranslation} from "../../../contexts/Localization";

interface Props {
  onClick?: () => void
  expanded?: boolean
}

export const ExpandableButton: React.FC<Props> = ({ onClick, expanded, children }) => {
  const { t } = useTranslation()

  return (
    <IconButton onClick={onClick} style={{backgroundColor: 'transparent'}}>
      {children}
      {expanded ? (
        <Flex alignItems='center'>
          <Text fontSize='15px' fontWeight='500' color='#FFF'>
            {expanded ? t('Hide Details') : t('Show Details')}
          </Text>
          <ChevronUpSecondIcon ml='8px' fill='white'/>
        </Flex>
      ) :
        <Flex alignItems='center'>
          <Text fontSize='15px' fontWeight='500' color='#FFF'>
            {t('Show Details')}
          </Text>
          <ChevronDownIcon ml='8px' fill='white'/>
        </Flex>}
    </IconButton>
  )
}
ExpandableButton.defaultProps = {
  expanded: false,
}

export const ExpandableLabel: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <Flex
      width="100%"
      height="70px"
      justifyContent='center'
      alignItems='center'
    >
      <ExpandableButton expanded={expanded} onClick={onClick} />
      {children}
    </Flex>
  )
}
ExpandableLabel.defaultProps = {
  expanded: false,
}
