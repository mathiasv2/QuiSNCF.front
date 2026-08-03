import { useEffect, useState } from "react"
import { useCookiePlayer } from "./useCookies"
import { checkStationInput } from "../services/stationService"

const ZOOM_LEVELS = [1000, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 120, 100]
const MAX_ATTEMPTS = ZOOM_LEVELS.length - 1

export type GameStatus = "playing" | "won"

export function useGameLogic() {
  const { gameData, initPlayer, saveResult } = useCookiePlayer("station")

  const [guessCount, setGuessCount] = useState<number>(
    () => gameData?.result?.tries ?? 0
  )
  const [status, setStatus] = useState<GameStatus>(
    () => gameData?.result?.won ? "won" : "playing"
  )
  const [guess, setGuess] = useState("")
  const [checking, setChecking] = useState(false)

  const zoom = ZOOM_LEVELS[Math.min(guessCount, MAX_ATTEMPTS)]

  useEffect(() => { initPlayer() }, [])

  const handleSubmit = async () => {
    if (!guess.trim() || status !== "playing" || checking) return

    setChecking(true)
    try {
      const { correct } = await checkStationInput(guess.trim())

      if (correct) {
        setStatus("won")
        saveResult({ won: true, tries: guessCount })
      } else {
        const nextCount = guessCount + 1
        setGuessCount(nextCount)
        saveResult({ won: false, tries: nextCount })
      }
    } finally {
      setChecking(false)
    }

    setGuess("")
  }

  return { guess, setGuess, zoom, guessCount, status, checking, handleSubmit }
}
