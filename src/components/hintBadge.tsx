import { useState } from "react"

interface Props {
  hint: string
  onReveal: () => void
}

export function HintButton({ hint, onReveal }: Props) {
  const [revealed, setRevealed] = useState(false)
  const words = hint.split(" ")

  const handleReveal = () => {
    setRevealed(true)
    onReveal()
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 font-mono text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
            Dossier confidentiel — SNCF
          </span>
          <span
            className={`text-[9px] tracking-widest font-bold uppercase transition-colors duration-500 ${
              revealed ? "text-green-400" : "text-red-500"
            }`}
          >
            {revealed ? "DÉCLASSIFIÉ" : "SECRET"}
          </span>
        </div>

        <div className="border-t border-zinc-700 pt-2 flex flex-wrap gap-x-1.5 gap-y-1 items-baseline">
          <span className="text-zinc-500">Indice :</span>
          {words.map((word, i) => (
            <span key={i} className="relative inline-block">
              {/* Texte réel */}
              <span
                className="text-white"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: "opacity 0.35s",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {word}
              </span>
              {/* Barre de caviardage */}
              <span
                aria-hidden
                className="absolute inset-x-0 rounded-[2px]"
                style={{
                  top: "-2px",
                  bottom: "-2px",
                  backgroundColor: "#0a0a0a",
                  opacity: revealed ? 0 : 1,
                  transition: "opacity 0.35s",
                  transitionDelay: `${i * 90}ms`,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {!revealed && (
        <button
          type="button"
          onClick={handleReveal}
          className="text-[11px] text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
        >
          🔓 Déclassifier l'indice (−1 tentative)
        </button>
      )}
    </div>
  )
}