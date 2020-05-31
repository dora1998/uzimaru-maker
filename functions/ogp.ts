import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont } from 'canvas'
import path from 'path'

export default (req: NextApiRequest, res: NextApiResponse) => {
  registerFont(path.join('functions', 'fonts', 'mplus-1c-medium.ttf'), {
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
