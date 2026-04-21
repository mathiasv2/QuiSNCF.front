import { useState } from "react"

interface Props {
  tries: number
  hint: string
}

export function HintButton({ hint, tries }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setVisible(!visible)}
        className="py-2 px-5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-white text-sm font-medium transition-all duration-150"
      >
        {visible ? "Masquer l'indice" : "Voir l'indice"}
      </button>

      {visible && (
        <p className="text-sm text-amber-600 text-center max-w-xs">
          {hint}
        </p>
      )}
    </div>
  )
}