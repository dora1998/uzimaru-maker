import React, {
  ComponentProps,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react'
import { Stage, Layer, Rect, Image, Path } from 'react-konva'
import { Stage as KonvaStage } from 'konva/types/Stage'
import { useTheme, Box } from '@chakra-ui/core'
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

  const containerRef = useRef<HTMLDivElement>()
  // DOM構築時にはreact-konvaのStage型が、操作時にはkonvaのStage型いるため、unknownの方が使い勝手が良い
  const stageRef = useRef()
  const fitStageIntoContainer = useCallback(() => {
    const container = containerRef.current
    const stage = stageRef.current as KonvaStage

    if (!(container && stage)) return

    // now we need to fit stage into parent
    const containerWidth = container.offsetWidth
    // to do this we need to scale the stage
    const scale = containerWidth / 512

    stage.width(512 * scale)
    stage.height(512 * scale)
    stage.scale({ x: scale, y: scale })
    stage.draw()
  }, [containerRef, stageRef])
  useLayoutEffect(() => {
    fitStageIntoContainer()
    window.addEventListener('resize', fitStageIntoContainer)
    return window.removeEventListener('resize', fitStageIntoContainer)
  }, [])

  return (
    <Box ref={containerRef} maxWidth="100%">
      <Stage ref={stageRef} width={544} height={544}>
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
    </Box>
  )
}
