import React, { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SITE_URL = process.env.SITE_URL

interface ServerSideProps {
  result: string | string[]
}
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  return { props: { result: ctx.query.result } }
}

type Props = ServerSideProps
const Share: NextPage<Props> = ({ result }) => {
  const ogpUrl = `${SITE_URL}/functions/ogp?result=${encodeURIComponent(
    result as string
  )}`

  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])

  return (
    <Head>
      <meta property="og:image" content={ogpUrl} />
      <meta name="twitter:image" content={ogpUrl} />
    </Head>
  )
}
export default Share
