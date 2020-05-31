import React from 'react'
import Head from 'next/head'
import { Box, useTheme, Heading, Flex, Button } from '@chakra-ui/core'
import { AppTheme } from '../lib/theme'
import { UzimaruEditBox } from '../components/UzimaruEditBox'

export default function Home() {
  const theme = useTheme() as AppTheme

  return (
    <Box className="container" color={theme.colors.white}>
      <Head>
        <title>うじまるくんをつくろう！</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main color={theme.colors.white}>
        <Box width="100%" maxWidth="768px" mx="auto">
          <Heading textAlign="center" my={8}>
            うじまるくんをつくろう！
          </Heading>
          <Flex justify="center">
            <UzimaruEditBox />
          </Flex>
        </Box>
      </main>

      <style jsx global>{`
        html {
          background-color: ${theme.colors.uzimaru.grayBg};
        }
      `}</style>
    </Box>
  )
}
