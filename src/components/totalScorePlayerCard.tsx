interface Props {
  totalScore: number
  gametype: string
}

const LABEL: Record<string, { emoji: string; label: string; color: string }> = {
  station: { emoji: "🏫", label: "Mon score total : Gares",  color: "text-sky-700"     },
  word:    { emoji: "🔤", label: "Mon score total : Mots",   color: "text-emerald-700" },
  display:    { emoji: "🚉", label: "Mon score total : Départs",   color: "text-orange-700" },
}

export function TotalScoreCard({ totalScore, gametype }: Props) {
  const meta = LABEL[gametype] ?? { emoji: "🏆", label: "Score total", color: "text-aubergine" }

  return (
    <div className="flex items-center justify-between w-full bg-parme rounded-2xl px-6 py-4 border border-aubergine/10">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{meta.emoji}</span>
        <span className="text-sm font-semibold text-aubergine/70">{meta.label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-black tabular-nums ${meta.color}`}>
          {totalScore.toLocaleString("fr-FR")}
        </span>
        <span className="text-xs text-aubergine/40 font-medium">pts</span>
      </div>
    </div>
  )
}