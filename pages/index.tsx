import * as React from 'react';
import Head from 'next/head';
import { Text, Box, useTheme, Heading } from '@chakra-ui/core';
import { AppTheme } from '../lib/theme';

export default function Home() {
  const theme = useTheme() as AppTheme;

  return (
    <div className="container">
      <Head>
        <title>うじまるくんを作ろう！</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box width="100%" maxWidth="768px" mx="auto">
          <Heading textAlign="center" my={8}>
            うじまるくんを作ろう！
          </Heading>
        </Box>
      </main>

      <style jsx global>{`
        html {
          background-color: ${theme.colors.uzimaru.gray};
          color: ${theme.colors.white};
        }
      `}</style>
    </div>
  );
}
