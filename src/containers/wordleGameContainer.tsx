import { useEffect, useState, useCallback } from "react"
import { useWordleLogic } from "../hooks/useWordleLogic"
import { type WordleState, type GuessRow, type GameStatus } from "../models/wordleTypes"
import { WordleGrid } from "../components/wordleGrid"
import { WordleKeyboard } from "../components/wordleKeyboard"
import { GameSkeleton } from "../components/gameSkeleton"
import { useCookiePlayer } from "../hooks/useCookies"
import { useRandomWord } from "../hooks/useWord"
import { GameType } from "../enums/gameType"
import { WinModal } from "../components/winModal"


export function WordleGameContainer() {
  const { word, definition, loading, error } = useRandomWord()
  const { gameData, initPlayer } = useCookiePlayer("wordle")

  useEffect(() => { initPlayer() }, [])

  if (loading) return <GameSkeleton />
  if (error || !word || !definition) {
    return (
      <p className="text-red-400 text-center">
        {error ?? "Aucun mot disponible"}
      </p>
    )
  }

  const savedState: WordleState | undefined = gameData?.wordleState ?? undefined

  return <WordleGameInner word={word} definition={definition} savedState={savedState} />
}


function WordleGameInner({
  word,
  definition,
  savedState,
}: {
  word: string
  definition: string
  savedState?: WordleState
}) {
  const {
    gameData,
    saveResult,
    saveWordleState,
  } = useCookiePlayer("wordle")

  const {
    WORD_LEN,
    MAX_TRIES,
    guesses,
    currentGuess,
    status,
    errorMessage,
    submitGuess,
    addLetter,
    deleteLetter,
    letterStatuses,
  } = useWordleLogic(word, savedState)

  const [showModal, setShowModal] = useState(
    savedState?.status === "won" && !gameData?.scoreRegistered
  )
  const [shake, setShake] = useState(false)
  const [showDef, setShowDef] = useState(
    savedState?.status === "won" || savedState?.status === "lost"
  )

  useEffect(() => {
    if (status === "won") {
      setShowDef(true)
      saveResult({ won: true, tries: guesses.length })
      const t = setTimeout(() => setShowModal(true), WORD_LEN * 120 + 600)
      return () => clearTimeout(t)
    }
    if (status === "lost") {
      setShowDef(true)
      saveResult({ won: false, tries: guesses.length })
    }
  }, [status])

  useEffect(() => {
    if (errorMessage) {
      setShake(true)
      const t = setTimeout(() => setShake(false), 400)
      return () => clearTimeout(t)
    }
  }, [errorMessage])

  const handleSubmit = useCallback(async () => {
    const result = await submitGuess()
    if (!result) return
    const newGuesses: GuessRow[] = (result as any)._newGuesses
    const newStatus: GameStatus = (result as any)._newStatus
    saveWordleState({ guesses: newGuesses, status: newStatus })
  }, [submitGuess, saveWordleState])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (status !== "playing") return
      if (e.ctrlKey || e.altKey || e.metaKey) return
      if (e.key === "Enter") handleSubmit()
      else if (e.key === "Backspace") deleteLetter()
      else if (/^[a-zA-ZÀ-ÿ]$/.test(e.key)) addLetter(e.key.toUpperCase())
    },
    [status, handleSubmit, deleteLetter, addLetter]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const statuses = letterStatuses()
  const gameOver = status !== "playing"

  return (
    <>
      {showModal && (
        <WinModal city={word} guessCount={guesses.length - 1} onClose={() => setShowModal(false)} gametype={GameType.Word} />
      )}

      <div className="flex flex-col items-center w-full max-w-lg rounded-2xl md:rounded-4xl bg-parme py-4 px-4 md:px-10">
        <p className="font-semibold text-xl md:text-3xl text-center text-aubergine pt-4 md:pt-6">
          Devinez le mot du jour
        </p>

        <div
          aria-live="polite"
          className={[
            "text-sm text-aubergine/80 text-center italic px-2 leading-relaxed overflow-hidden transition-all duration-500",
            showDef ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0",
            "grid",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            {showDef && `« ${definition} »`}
          </div>
        </div>

        <div className="flex gap-4 mt-4 mb-1 text-xs text-aubergine/70 items-center flex-wrap justify-center">
          <LegendItem type="correct" label="Bonne place" />
          <LegendItem type="present" label="Mauvaise place" />
          <LegendItem type="absent" label="Absent" />
        </div>

        <div role="grid" aria-label="Grille de jeu" className="my-1">
          <WordleGrid
            wordLen={WORD_LEN}
            maxTries={MAX_TRIES}
            guesses={guesses}
            currentGuess={currentGuess}
            shake={shake}
          />
        </div>

        <div aria-live="assertive" className="min-h-[1.4rem] my-1 text-center">
          {errorMessage && (
            <p className="text-sm font-semibold text-aubergine/80">{errorMessage}</p>
          )}
          {status === "lost" && (
            <p className="text-sm font-semibold text-aubergine">
              Le mot était :{" "}
              <span className="uppercase tracking-widest">{word}</span>
            </p>
          )}
        </div>

        
        <WordleKeyboard
          letterStatuses={statuses}
          onKey={addLetter}
          onDelete={deleteLetter}
          onSubmit={handleSubmit}
          disabled={gameOver}
        />
      </div>
    </>
  )
}


function LegendItem({ type, label }: { type: "correct" | "present" | "absent"; label: string }) {
  const dot: Record<string, string> = {
    correct: "bg-emerald-700",
    present: "bg-amber-600",
    absent:  "bg-neutral-500",
  }
  return (
    <span className="flex items-center gap-1.5">
      <span className={`relative w-3.5 h-3.5 rounded-sm ${dot[type]} shrink-0`}>
        {type === "correct" && (
          <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white/40" />
        )}
        {type === "present" && (
          <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-white/40 rotate-45" />
        )}
      </span>
      {label}
    </span>
  )
}