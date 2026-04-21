import { useState } from "react"
import type { GameStatus } from "../hooks/useGameLogic"

interface Props {
  src: string
  zoom: number
  status: GameStatus
}

export function StationImage({ src, zoom, status }: Props) {
  const [pos] = useState(() => ({
    x: Math.round(Math.random() * 100),
    y: Math.round(Math.random() * 100),
  }))

  const won = status === "won"

  return (


      <div className="w-64 h-64 rounded-xl transition-all duration-700 border-white border-2 bg-no-repeat bg-white"
        style={{
          backgroundImage: `url(${src})`,
        backgroundSize: won ? "contain" : `${zoom}%`,   
        backgroundPosition: won ? "center" : `${pos.x}% ${pos.y}%`,
        }}
      />


  )
}