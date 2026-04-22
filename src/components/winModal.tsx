import { useState, useEffect } from "react"
import { usePostPlayer } from "../hooks/usePlayer"

interface Props {
  city: string
  guessCount: number
}

const SCORE_LABELS = [
    { min: 5000, label: "Chef de gare", emoji: "🏆", color: "text-yellow-300" },
    { min: 4000, label: "Conducteur de train",     emoji: "⭐",  color: "text-blue-200"   },
    { min: 3000, label: "Agent de terrain",  emoji: "👍",  color: "text-green-300"  },
    { min: 2000,  label: "Voyageur",    emoji: "😅",  color: "text-orange-300" },
    { min: 1000,  label: "Pigeon de gare",    emoji: "😅",  color: "text-brown-300" },
    { min: 0,  label: "Joueur de diabolo",    emoji: "😅",  color: "text-black" },
]

function computeScore(guessCount: number) {
  return Math.round(5000 - (guessCount * 323))
}

export function WinModal({ city, guessCount }: Props) {
  const [pseudo, setPseudo] = useState("")
  const [saved, setSaved] = useState(false)
  const [visible, setVisible] = useState(false)
  const { submit } = usePostPlayer()
  

  const score = computeScore(guessCount)
  const rank = SCORE_LABELS.find((r) => score >= r.min)!

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const handleSave = async () => {

    if (!pseudo.trim()) return
    console.log
    await submit({ name: pseudo.trim(), tries: guessCount, multiplier: guessCount })
    setSaved(true)
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      onClick={() => setVisible(false)}
    >
      <div
        className={`
          relative flex flex-col items-center gap-6
          bg-blue-900/90 border-2 border-white/20
          rounded-2xl px-10 py-10 shadow-2xl w-full max-w-sm mx-4
          transition-all duration-500
          ${visible ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-4"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="text-5xl mb-2">{rank.emoji}</p>
          <p className={`text-2xl font-bold ${rank.color}`}>{rank.label}</p>
          <p className="text-white/70 text-sm mt-1">
            C'était <span className="text-white font-semibold">{city}</span>
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-6xl font-black text-white tracking-tight">{score}</p>
          <p className="text-white/50 text-xs uppercase tracking-widest">points</p>
          <p className="text-white/40 text-xs mt-1">
            Trouvé en {guessCount === 0 ? "1 essai" : `${guessCount + 1} essais`}
          </p>
        </div>

        <div className="w-full border-t border-white/10" />

        {!saved ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-white/70 text-sm">Enregistre ton score</p>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Ton pseudo…"
                maxLength={20}
                className="flex-1 py-2 px-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-white/30 outline-none focus:border-white/50 transition-all text-sm"
              />
              <button
                onClick={handleSave}
                disabled={!pseudo.trim()}
                className="bg-white text-blue-900 font-bold py-2 px-5 rounded-full text-sm hover:bg-blue-100 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <p className="text-green-300 text-sm font-semibold animate-pulse">
            Score enregistré ✓
          </p>
        )}

        <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-4 text-white/30 hover:text-white/70 text-xl transition-colors"
            aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>
  )
}