import { theme, DefaultTheme } from '@chakra-ui/core'

export type AppTheme = DefaultTheme & {
  colors: { uzimaru: { gray: string; grayBg: string; green: string } }
}

// Let's say you want to add custom colors
export const appTheme: AppTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    uzimaru: {
      gray: '#3C3C3C',
      grayBg: '#4d4d4d',
      green: '#199861',
    },
  },
}
