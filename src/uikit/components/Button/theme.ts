import { scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '48px',
    padding: '0 24px',
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px',
  },
  [scales.XS]: {
    height: '26px',
    fontSize: '12px',
    padding: '0 4px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: '#4E89E3',
    color: 'white',
  },
  [variants.SECONDARY]: {
    backgroundColor: '#E7F7FF',
    borderRadius: '4px',
    padding: '4px 12px',
    fontSize: '15px',
    lineHeight: '16px',
    color: '#4E89E3',
    fontWeight: 'normal',
  },
  [variants.TERTIARY]: {
    backgroundColor: '#ecab43',
    boxShadow: 'none',
    color: 'primary',
  },
  [variants.SUBTLE]: {
    backgroundColor: '#ecab43',
    color: 'backgroundAlt',
  },
  [variants.DANGER]: {
    backgroundColor: '#4E89E3',
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: 'none',
  },
  [variants.LIGHT]: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}
