import { useState } from "react"

const ZOOM_LEVELS = [1000, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 120, 100]
const MAX_ATTEMPTS = ZOOM_LEVELS.length - 1

export type GameStatus = "playing" | "won" | "lost"

export function useGameLogic(cityAnswer: string) {
  const [guess, setGuess] = useState("")
  const [guessCount, setGuessCount] = useState(0)
  const [status, setStatus] = useState<GameStatus>("playing")

  const zoom = ZOOM_LEVELS[Math.min(guessCount, MAX_ATTEMPTS)]

  const handleSubmit = () => {
    if (!guess.trim() || status !== "playing") return

    if (guess.trim().toLowerCase() === cityAnswer.toLowerCase()) {
      setStatus("won")
    } else if (guessCount >= MAX_ATTEMPTS) {
      setStatus("lost")
    } else {
      setGuessCount((prev) => prev + 1)
    }

    setGuess("")
  }

  return { guess, setGuess, zoom, guessCount, status, handleSubmit }
}