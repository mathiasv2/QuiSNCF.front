import { useEffect, useState } from "react"
import { useCookiePlayer } from "./useCookies"
import { checkCityInput } from "../services/displayService"

export type DisplayGameStatus = "playing" | "won"

export function useDisplayGameLogic() {
  const { gameData, initPlayer, saveResult } = useCookiePlayer("depart")

  const [guessCount, setGuessCount] = useState<number>(
    () => gameData?.result?.tries ?? 0
  )
  const [status, setStatus] = useState<DisplayGameStatus>(
    () => gameData?.result?.won ? "won" : "playing"
  )
  const [cityName, setCityName] = useState<string>(
    () => gameData?.city ?? ""
  )
  const [guess, setGuess] = useState("")
  const [wrongGuess, setWrongGuess] = useState(false)
  const [checking, setChecking] = useState(false)
  const [proof, setProof] = useState<string | null>(() => gameData?.proof ?? null)

  useEffect(() => { initPlayer() }, [])

  useEffect(() => {
    if (wrongGuess) {
      const t = setTimeout(() => setWrongGuess(false), 2500)
      return () => clearTimeout(t)
    }
  }, [wrongGuess])

  const handleSubmit = async () => {
    if (!guess.trim() || status !== "playing" || checking) return

    setChecking(true)
    try {
      const { correct, cityName: name, token } = await checkCityInput(guess.trim(), proof)
      if (token) setProof(token)

      if (correct) {
        const foundCity = name ?? guess.trim()
        setCityName(foundCity)
        setStatus("won")
        saveResult({ won: true, tries: guessCount, city: foundCity, proof: token })
      } else {
        const nextCount = guessCount + 1
        setGuessCount(nextCount)
        setWrongGuess(true)
        saveResult({ won: false, tries: nextCount, proof: token })
      }
    } finally {
      setChecking(false)
    }

    setGuess("")
  }

  return { guess, setGuess, guessCount, status, cityName, wrongGuess, checking, handleSubmit }
}
