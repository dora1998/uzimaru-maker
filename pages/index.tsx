import * as React from 'react';
import Head from 'next/head';
import { Text } from '@chakra-ui/core';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text>Hello World!</Text>
      </main>
    </div>
  );
}
