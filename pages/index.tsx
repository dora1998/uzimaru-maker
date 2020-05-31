import React, { ComponentProps, useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { Box, useTheme, Heading, Flex, Button, Text } from '@chakra-ui/core'
import { Path } from 'react-konva'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AppTheme } from '../lib/theme'
import { UzimaruEditBox } from '../components/UzimaruEditBox'
import { getScoreFromPaths, makeRandomPositionandScale } from '../lib/game'
import { ShareButton } from '../components/ShareButton'

const Home: NextPage = () => {
  const theme = useTheme() as AppTheme
  const [score, setScore] = useState<number | null>(null)
  const [paths, setPaths] = useState<ComponentProps<typeof Path>[]>([
    {
      data:
        'M221.1,111.1c16.6,0,24.3,13.4,24.3,22.4c0,9-5.1,25-23,25s-24.3-14.1-24.3-25C198.1,122.6,207,111.1,221.1,111.1z',
      fill: theme.colors.uzimaru.green,
      draggable: true,
    },
    {
      data:
        'M164.2,223.8c0,52.5,41,92.8,93.4,92.8V291c-34.6,0-67.2-30.1-67.2-67.2H164.2z',
      fill: theme.colors.uzimaru.green,
      draggable: true,
    },
    {
      data: 'M100.2,134.8c11.5-20.6,25.2-35.8,37.3-46.7L72,83L100.2,134.8',
      fill: theme.colors.uzimaru.green,
      draggable: true,
    },
  ])
  useEffect(() => {
    setPaths(paths.map((p) => ({ ...p, ...makeRandomPositionandScale() })))
  }, [])

  const scoreStr = useMemo(() => Math.round(score * 10) / 10, [score])
  const shareUrl = useMemo(() => {
    const resJson = paths.map((p) => ({ x: p.x, y: p.y }))
    return `${process.env.SITE_URL}/share?result=${encodeURIComponent(
      JSON.stringify(resJson)
    )}`
  }, [paths])

  return (
    <Box className="container" color={theme.colors.white}>
      <main color={theme.colors.white}>
        <Box width="100%" maxWidth="768px" mx="auto">
          <Heading textAlign="center" my={8}>
            うじまるくんをつくろう！
          </Heading>
          <Flex justify="center">
            <UzimaruEditBox paths={paths} setPaths={setPaths} />
          </Flex>

          <Button
            variantColor="green"
            size="lg"
            width="100%"
            mt={4}
            onClick={() => setScore(getScoreFromPaths(paths))}
          >
            できた！
          </Button>
          {score && (
            <>
              <Flex align="center" justify="center" direction="column">
                <Text fontSize="xl">
                  このうじまるくんは、
                  <Text fontSize="4xl" as="span">
                    {scoreStr}
                  </Text>
                  点！
                </Text>
                <ShareButton
                  buttonProps={{
                    leftIcon: AiOutlineTwitter,
                    variantColor: 'blue',
                    mt: 8,
                  }}
                  text={`${scoreStr}点のうじまるくんを作ったよ！`}
                  url={shareUrl}
                  hashtags="uzimaru生誕LT会"
                >
                  結果をシェアする
                </ShareButton>
              </Flex>
            </>
          )}
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

export default Home
