import { useEffect, useState } from "react"
import { useCookiePlayer } from "./useCookies"

const ZOOM_LEVELS = [1000, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 120, 100]
const MAX_ATTEMPTS = ZOOM_LEVELS.length - 1

export type GameStatus = "playing" | "won"

export function useGameLogic(cityAnswer: string) {
  const { gameData, initPlayer, saveResult } = useCookiePlayer("station")

  const [guessCount, setGuessCount] = useState<number>(
    () => gameData?.result?.tries ?? 0
  )
  const [status, setStatus] = useState<GameStatus>(
    () => gameData?.result?.won ? "won" : "playing"
  )
  const [guess, setGuess] = useState("")

  const zoom = ZOOM_LEVELS[Math.min(guessCount, MAX_ATTEMPTS)]

  useEffect(() => { initPlayer() }, [])

  const handleSubmit = () => {
    if (!guess.trim() || status !== "playing") return

    if (guess.trim().toLowerCase() === cityAnswer.toLowerCase()) {
      setStatus("won")
      saveResult({ won: true, tries: guessCount })
    } else {
      const nextCount = guessCount + 1
      setGuessCount(nextCount)
      saveResult({ won: false, tries: nextCount })
    }

    setGuess("")
  }

  return { guess, setGuess, zoom, guessCount, status, handleSubmit }
}