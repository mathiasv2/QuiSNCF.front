import { useState } from "react"

interface Props {
  src: string
  zoom: number
}

export function StationImage({ src, zoom }: Props) {
  const [pos] = useState(() => ({
    x: Math.round(Math.random() * 100),
    y: Math.round(Math.random() * 100),
  }))

  return (

      <div
        className="w-64 h-64 rounded-xl transition-all duration-700 border-white border-2"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: `${zoom}%`,
          backgroundPosition: `${pos.x}% ${pos.y}%`,
        }}
      />

  )
}