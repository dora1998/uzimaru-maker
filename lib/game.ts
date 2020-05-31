export function makeRandomPositionandScale(): {
  scaleX: number
  scaleY: number
  x: number
  y: number
} {
  // TODO: 拡大縮小するとx, yも変わるので諦めた
  // const scale = Math.random() * 2 + 0.5
  const scale = 1
  return {
    scaleX: scale,
    scaleY: scale,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
  }
}

export function getScoreFromPaths(
  paths: { x?: number; y?: number; scaleX?: number; scaleY?: number }[]
): number {
  const errorScore = paths.reduce(
    (acc, { x = 0, y = 0 }) => acc + (Math.abs(x) + Math.abs(y)) / 5,
    0
  )
  return Math.max(0, 100 - errorScore)
}
