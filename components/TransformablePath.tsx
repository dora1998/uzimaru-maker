import React from 'react'
import { ComponentProps, useRef, useEffect } from 'react'
import { Transformer, Path } from 'react-konva'
import Konva from 'konva'

interface Props {
  pathProps: ComponentProps<typeof Path>
  isSelected: boolean
  onChange: (newPathProps: ComponentProps<typeof Path>) => void
  onSelect?: () => void
}
export const TransformablePath: React.FC<Props> = ({
  pathProps,
  isSelected,
  onChange,
  onSelect = () => {},
}) => {
  const pathRef = useRef<Konva.Path>()
  const trRef = useRef()

  useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      const refCurrent = trRef.current as any
      refCurrent.setNode(pathRef.current)
      refCurrent.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Path
        onClick={onSelect}
        onTap={onSelect}
        ref={pathRef}
        {...pathProps}
        draggable
        onDragStart={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...pathProps,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={() => {
          const node = pathRef.current
          onChange({
            ...pathProps,
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio={true}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
