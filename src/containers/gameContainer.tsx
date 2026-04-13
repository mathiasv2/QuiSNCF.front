import { useState, useCallback } from "react"
import { useRandomStation, useCheckUserInput } from "../hooks/useRandomStation"
import { HintButton } from "../components/hintBadge"
import { StationImage } from "../components/stationImage"
import { AttemptTracker } from "../components/attemptTracker"
import { AnswerForm } from "../components/answerInput"
import { GameResult } from "./gameResult"


const ZOOM_LEVELS = [1000, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 120, 100]
const MAX_ATTEMPTS = ZOOM_LEVELS.length - 1  // = 12

type GameStatus = "playing" | "won" | "lost"

export function GameContainer() {
  const { station, loading, error, reload } = useRandomStation()
  const { checkInput } = useCheckUserInput()
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState<GameStatus>("playing")

  const handleSubmit = useCallback(async (input: string) => {
    const correct = await checkInput(input)
    if (correct) {
      setStatus("won")
    } else {
      const next = attempts + 1
      if (next >= MAX_ATTEMPTS) {
        setAttempts(MAX_ATTEMPTS) // ← image à 100% (entièrement visible)
        setStatus("lost")
      } else {
        setAttempts(next)
      }
    }
  }, [attempts, checkInput])

  // Révéler l'indice coûte une tentative
  const handleHintReveal = useCallback(() => {
    if (status !== "playing") return
    const next = attempts + 1
    if (next >= MAX_ATTEMPTS) {
      setAttempts(MAX_ATTEMPTS)
      setStatus("lost")
    } else {
      setAttempts(next)
    }
  }, [attempts, status])

  const handleRestart = useCallback(() => {
    setAttempts(0)
    setStatus("playing")
    reload()
  }, [reload])

  if (loading) return <GameSkeleton />
  if (error || !station) return <p className="text-red-400 text-center">{error ?? "Aucune station disponible"}</p>

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      <HintButton hint={station.hint} onReveal={handleHintReveal} />
      

      <StationImage
        src={`${station.pictureUrl}.jpg`}
        zoom={ZOOM_LEVELS[attempts]}
      />

      <AttemptTracker current={attempts} max={MAX_ATTEMPTS} />

      {status === "playing" ? (
        <AnswerForm onSubmit={handleSubmit} value={""} onChange={function (value: string): void {
                  throw new Error("Function not implemented.")
              } } />
      ) : (
        <GameResult
          status={status}
          stationName={station.name}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

function GameSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto animate-pulse">
      <div className="h-12 w-full bg-white/10 rounded-lg" />
      <div className="w-64 h-64 rounded-xl bg-white/10" />
      <div className="h-4 w-40 bg-white/10 rounded-full" />
    </div>
  )
}