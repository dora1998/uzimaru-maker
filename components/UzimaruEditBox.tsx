import React, { ComponentProps, useState, useCallback } from 'react'
import { Stage, Layer, Rect, Image, Path } from 'react-konva'
import { useTheme } from '@chakra-ui/core'
import useImage from 'use-image'
import { AppTheme } from '../lib/theme'
import { TransformablePath } from './TransformablePath'

export const UzimaruEditBox: React.FC = () => {
  const theme = useTheme() as AppTheme
  const [frame] = useImage('/images/uzimaru_frame.svg')

  const [selectPathIndex, setSelectPathIndex] = useState<number>(-1)
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
  const updatePathProps = useCallback(
    (i: number, newPathProps: ComponentProps<typeof Path>) => {
      const newPaths = [...paths]
      newPaths[i] = newPathProps
      setPaths(newPaths)
    },
    [paths, setPaths]
  )

  return (
    <Stage width={544} height={544}>
      <Layer>
        <Rect
          x={16}
          y={16}
          width={512}
          height={512}
          fill={theme.colors.uzimaru.gray}
          shadowBlur={5}
        />
        <Image
          image={frame}
          x={0}
          y={0}
          width={512}
          height={512}
          onClick={() => setSelectPathIndex(-1)}
        />

        {paths.map((p, i) => (
          <TransformablePath
            key={i}
            pathProps={p}
            isSelected={i === selectPathIndex}
            onChange={(newProps) => updatePathProps(i, newProps)}
            onSelect={() => setSelectPathIndex(i)}
          />
        ))}
      </Layer>
    </Stage>
  )
}
