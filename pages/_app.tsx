import * as React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { appTheme } from '../lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
