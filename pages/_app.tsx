import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { appTheme } from '../lib/theme'

const SITE_URL = process.env.SITE_URL
const SITE_TITLE = 'うじまるくんをつくろう！'
const SITE_DESCRIPTION = 'あなたのうじまるくんへの愛が試される…！'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <Head>
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:image" content={`${SITE_URL}/images/site_ogp.png`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta name="twitter:site" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/site_ogp.png`}
        />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <title>{SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
