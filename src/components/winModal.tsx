import { useState, useEffect } from "react"
import { usePostPlayer } from "../hooks/usePlayer"
import { GameType } from "../enums/gameType"
import { useCookiePlayer } from "../hooks/useCookies"

interface Props {
  city: string
  guessCount: number
  onClose: () => void
  gametype: GameType
}

const SCORE_LABELS = [
  { min: 5000, label: "Chef de gare",        emoji: "🏆", color: "text-amber-300"   },
  { min: 4000, label: "Conducteur de train", emoji: "🚆", color: "text-sky-300"     },
  { min: 3000, label: "Explorateur du réseau",emoji: "🛤️", color: "text-emerald-300"},
  { min: 2000, label: "Voyageur régulier",   emoji: "🎫", color: "text-orange-300"  },
  { min: 1000, label: "Usager égaré",        emoji: "🧭", color: "text-zinc-300"    },
  { min: 0,    label: "Touriste perdu",      emoji: "📍", color: "text-slate-400"   },
]

function computeScore(guessCount: number) {
  return Math.max(500, Math.round(5000 - guessCount * 323))
}

export function WinModal({ city, guessCount, onClose, gametype }: Props) {
  const [visible, setVisible] = useState(false)
  const { submit } = usePostPlayer()

  const { gameData, saveScoreRegistered, savedPseudo, savePseudo } = useCookiePlayer(
      gametype === GameType.Station ? "station" : "wordle"
  )

  const [saved, setSaved] = useState(gameData?.scoreRegistered ?? false)
  const [pseudo, setPseudo] = useState(savedPseudo ?? "")
  const [error, setError] = useState("")

  const isValidPseudo = (name: string) =>
    /^[a-zA-Z0-9_\-éèêëàâùûüîïôçœæ ]+$/.test(name)

  const score = computeScore(guessCount)
  const rank = SCORE_LABELS.find((r) => score >= r.min)!

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const handleSave = async () => {
    if (!pseudo.trim()) return
    if (!isValidPseudo(pseudo.trim())) {
      setError("Pseudo invalide : lettres, chiffres et _ - autorisés")
      return
    }
    setError("")
    savePseudo(pseudo.trim())
    await submit({ name: pseudo.trim(), tries: guessCount + 1, score: 0, gameType: gametype })
    saveScoreRegistered()
    setSaved(true)
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-sm transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative flex flex-col items-center gap-6
          bg-lavande/90 border-2 border-white/20
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
            <p className="text-white/70 text-sm text-center">
              Enregistrez votre score avec le même pseudo chaque jour
            </p>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                onFocus={(e) => {
                  setTimeout(() => {
                    e.target.scrollIntoView({ behavior: "smooth", block: "center" })
                  }, 300)
                }}
                placeholder="Votre pseudo…"
                maxLength={20}
                className="flex-1 py-2 px-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-white/30 outline-none focus:border-white/50 transition-all text-base"
              />
              <button
                onClick={handleSave}
                disabled={!pseudo.trim()}
                className="bg-white text-blue-900 font-bold py-2 px-5 rounded-full text-sm hover:bg-blue-100 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                OK
              </button>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>
        ) : (
          <p className="text-green-300 text-sm font-semibold animate-pulse">
            Score enregistré ✓
          </p>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/30 hover:text-white/70 text-xl transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>
  )
}