interface Props {
  status: "won" | "lost"
  stationName: string
  onRestart: () => void
}

export function GameResult({ status, stationName, onRestart }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className={`text-2xl font-semibold ${status === "won" ? "text-green-400" : "text-red-400"}`}>
        {status === "won" ? "Bravo !" : "Perdu !"}
      </p>
      {status === "lost" && (
        <p className="text-sm text-zinc-400">
          C'était <span className="text-white font-medium">{stationName}</span>
        </p>
      )}
      <button
        type="button"
        onClick={onRestart}
        className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
      >
        Nouvelle gare
      </button>
    </div>
  )
}