import type { LetterStatus } from "../hooks/useWordleLogic"

const ROWS = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTRÉE", "W", "X", "C", "V", "B", "N", "⌫"],
]

interface WordleKeyboardProps {
  letterStatuses: Record<string, LetterStatus>
  onKey: (key: string) => void
  onDelete: () => void
  onSubmit: () => void
  disabled: boolean
}

function getKeyClass(letter: string, status?: LetterStatus): string {
  const base =
    "flex items-center justify-center rounded-lg font-semibold text-sm cursor-pointer select-none transition-all active:scale-95 border"

  if (!status) {
    return `${base} bg-white/60 border-aubergine/20 text-aubergine hover:bg-white/80`
  }

  const map: Record<LetterStatus, string> = {
    correct: "bg-emerald-700 border-emerald-700 text-white",
    present: "bg-amber-600 border-amber-600 text-white",
    absent: "bg-neutral-500 border-neutral-500 text-white/90",
  }

  return `${base} ${map[status]}`
}

export function WordleKeyboard({
  letterStatuses,
  onKey,
  onDelete,
  onSubmit,
  disabled,
}: WordleKeyboardProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full mt-2" role="group" aria-label="Clavier">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1 md:gap-1.5">
          {row.map((key) => {
            const isEnter = key === "ENTRÉE"
            const isDelete = key === "⌫"
            const status = !isEnter && !isDelete ? letterStatuses[key] : undefined

            return (
              <button
                key={key}
                disabled={disabled}
                aria-label={isDelete ? "Supprimer" : isEnter ? "Valider" : key}
                onClick={() => {
                  if (isDelete) onDelete()
                  else if (isEnter) onSubmit()
                  else onKey(key)
                }}
                className={[
                  getKeyClass(key, status),
                  isEnter || isDelete
                    ? "px-2 md:px-3 h-12 md:h-14 text-xs md:text-sm bg-aubergine/80 border-aubergine text-white hover:bg-aubergine"
                    : "w-8 md:w-10 h-12 md:h-14",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                ].join(" ")}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}