import React from 'react'
import { Button } from '@chakra-ui/core'
import { ButtonProps } from '@chakra-ui/core/dist/Button'

interface Props {
  text?: string
  url?: string
  hashtags?: string
  buttonProps?: Omit<ButtonProps, 'children'>
}
export const ShareButton: React.FC<Props> = ({
  children,
  text,
  url,
  hashtags,
  buttonProps,
}) => {
  const params = new URLSearchParams()
  params.append('text', text ?? '')
  params.append('url', url ?? '')
  params.append('hashtags', hashtags ?? '')
  const shareUrl = `https://twitter.com/intent/tweet?${params.toString()}`

  return (
    <Button
      as="a"
      // @ts-ignore
      target="_blank"
      rel="nofollow noopener noreferrer"
      href={shareUrl}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
