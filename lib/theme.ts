import { theme, DefaultTheme } from '@chakra-ui/core';

export type AppTheme = DefaultTheme & {
  colors: { uzimaru: { gray: string; green: string } };
};

// Let's say you want to add custom colors
export const appTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    uzimaru: {
      gray: '#3C3C3C',
      green: '#199861',
    },
  },
};
