import type { GuessRow, LetterStatus } from "../hooks/useWordleLogic"

interface WordleGridProps {
  wordLen: number
  maxTries: number
  guesses: GuessRow[]
  currentGuess: string
  shake: boolean
}

function getTileClass(status?: LetterStatus): string {
  const base =
    "flex items-center justify-center font-bold uppercase text-xl md:text-2xl rounded-lg border-2 transition-colors relative select-none"

  if (!status) return `${base} border-aubergine/20 text-aubergine bg-white/40`

  const map: Record<LetterStatus, string> = {
    correct:
      "border-emerald-700 bg-emerald-700 text-white tile-correct",
    present:
      "border-amber-600 bg-amber-600 text-white tile-present",
    absent:
      "border-neutral-500 bg-neutral-500 text-white",
  }

  return `${base} ${map[status]}`
}

export function WordleGrid({ wordLen, maxTries, guesses, currentGuess, shake }: WordleGridProps) {
  const tileSize = wordLen <= 6 ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10 md:w-12 md:h-12"

  return (
    <div className="flex flex-col gap-1.5 my-2">
      {Array.from({ length: maxTries }).map((_, rowIdx) => {
        const submitted = guesses[rowIdx]
        const isCurrent = rowIdx === guesses.length && !submitted
        const letters = submitted
          ? submitted.letters
          : isCurrent
          ? currentGuess.split("")
          : []

        return (
          <div
            key={rowIdx}
            className={`flex gap-1.5 ${shake && isCurrent ? "animate-shake" : ""}`}
            role="row"
          >
            {Array.from({ length: wordLen }).map((_, colIdx) => {
              const letter = letters[colIdx] ?? ""
              const status = submitted?.result[colIdx]
              const isRevealing = !!submitted

              return (
                <div
                  key={colIdx}
                  role="gridcell"
                  style={
                    isRevealing
                      ? { animationDelay: `${colIdx * 120}ms` }
                      : undefined
                  }
                  className={[
                    getTileClass(status),
                    tileSize,
                    isRevealing ? "animate-flip" : "",
                    !submitted && letter ? "border-aubergine/50 bg-white/60 scale-105" : "",
                  ].join(" ")}
                  aria-label={letter ? `${letter}${status ? `, ${status}` : ""}` : "vide"}
                >
                  {letter}
                  {status === "correct" && (
                    <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-white/40 pointer-events-none" />
                  )}
                  {status === "present" && (
                    <span className="absolute bottom-1 right-1 w-2 h-2 bg-white/40 pointer-events-none rotate-45" />
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}