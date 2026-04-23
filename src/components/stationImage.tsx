import { useState } from "react"
import type { GameStatus } from "../hooks/useGameLogic"

interface Props {
  src: string
  zoom: number
  status: GameStatus
  x: number
  y: number
}

export function StationImage({ src, zoom, status, x, y }: Props) {
  const [pos] = useState(() => ({
    x: Math.round(x * 100),
    y: Math.round(y * 100),
  }))

  const won = status === "won"

  return (
    <div
      className="w-full max-w-[16rem] h-64 md:w-64 rounded-xl transition-all duration-700 border-white border-2 bg-no-repeat bg-white"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: won ? "contain" : `${zoom}%`,
        backgroundPosition: won ? "center" : `${pos.x}% ${pos.y}%`,
      }}
    />
  )
}