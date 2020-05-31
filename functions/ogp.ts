import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont, Image } from 'canvas'
import path from 'path'
import { appTheme } from '../lib/theme'
import { getScoreFromPaths } from '../lib/game'

const loadImage = (src: string): Promise<Image> => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = (err) => {
      reject(err)
    }
    img.src = src
  })
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (typeof req.query.result !== 'string') {
    res.status(400)
    res.send('')
    return
  }
  const result = JSON.parse(req.query.result)
  const score = getScoreFromPaths(result)
  const scoreStr = Math.floor(score)

  registerFont(path.join('fonts', 'mplus-1c-medium.ttf'), {
    family: 'mplus',
  })

  const canvas = createCanvas(960, 540)
  const context = canvas.getContext('2d')

  context.fillStyle = appTheme.colors.uzimaru.gray
  context.fillRect(0, 0, 960, 540)

  const uzimaru = await loadImage('./public/images/uzimaru.svg')
  context.drawImage(uzimaru, 0, 0)

  context.fillStyle = '#fff'
  context.font = '144px mplus'
  context.fillText(`${scoreStr}`, 500, 300)
  context.font = '72px mplus'
  context.fillText('点', 800 - (score < 100 ? 100 : 0), 290)
  context.font = '48px mplus'
  context.fillText('のうじまるくん', 500, 400)

  const image = canvas.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': image.length,
  })
  res.end(image, 'binary')
}
