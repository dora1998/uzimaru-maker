import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont } from 'canvas'
import fontData from './font'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const fs = require('fs')
  const decode = new Buffer(fontData, 'base64')
  fs.writeFileSync('/tmp/ogp_font.ttf', decode)
  registerFont('/tmp/ogp_font.ttf', {
    family: 'mplus',
  })

  const canvas = createCanvas(960, 540)
  const context = canvas.getContext('2d')

  context.font = '72px mplus'
  context.fillStyle = '#ffffff'
  context.fillText('OGPのテスト', 100, 100)

  const image = canvas.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': image.length,
  })
  res.end(image, 'binary')
}
