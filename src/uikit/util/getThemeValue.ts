import get from 'lodash/get'
import { DefaultTheme } from 'styled-components'

const getThemeValue =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (path: string, fallback?: string | number) =>
  (theme: DefaultTheme): string =>
    get(theme, path)

export default getThemeValue
