import { ComponentProps } from 'react'
import { Path } from 'react-konva'

export const getSvgTextFromPaths = (paths: ComponentProps<typeof Path>[]) => {
  return `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
\t y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<style type="text/css">
\t.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#199861;}
</style>
${paths.reduce((acc, p) => acc + getPathTextFromObject(p), '')}
</svg>
`
}

export const getPathTextFromObject = (path: ComponentProps<typeof Path>) =>
  `<path d="${path.data}" class="st1" transform="translate(${path.x} ${path.y})"/>`

export const partsPaths = <ComponentProps<typeof Path>[]>[
  {
    data:
      'M221.1,111.1c16.6,0,24.3,13.4,24.3,22.4c0,9-5.1,25-23,25s-24.3-14.1-24.3-25C198.1,122.6,207,111.1,221.1,111.1z',
  },
  {
    data:
      'M164.2,223.8c0,52.5,41,92.8,93.4,92.8V291c-34.6,0-67.2-30.1-67.2-67.2H164.2z',
  },
  {
    data: 'M100.2,134.8c11.5-20.6,25.2-35.8,37.3-46.7L72,83L100.2,134.8',
  },
]
