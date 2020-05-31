import React, { ComponentProps, useState, useCallback } from 'react'
import { Stage, Layer, Rect, Image, Path } from 'react-konva'
import { useTheme } from '@chakra-ui/core'
import useImage from 'use-image'
import { AppTheme } from '../lib/theme'
import { TransformablePath } from './TransformablePath'

interface Props {
  paths: ComponentProps<typeof Path>[]
  setPaths: (newPaths: ComponentProps<typeof Path>[]) => void
}
export const UzimaruEditBox: React.FC<Props> = ({ paths, setPaths }) => {
  const theme = useTheme() as AppTheme
  const [frame] = useImage('/images/uzimaru_frame.svg')

  const [selectPathIndex, setSelectPathIndex] = useState<number>(-1)
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
            // onSelect={() => setSelectPathIndex(i)}
          />
        ))}
      </Layer>
    </Stage>
  )
}
