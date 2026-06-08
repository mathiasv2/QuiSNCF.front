import { useState, useCallback } from "react"
import { type LetterStatus, type GuessRow, type GameStatus, type WordleState } from "../models/wordleTypes"
import { verifyWord } from "../services/wordService"

export type { LetterStatus, GuessRow, GameStatus, WordleState }

export function useWordleLogic(word: string, initialState?: WordleState) {
  const WORD = word.toUpperCase()
  const WORD_LEN = WORD.length
  const MAX_TRIES = 6

  const [guesses, setGuesses] = useState<GuessRow[]>(initialState?.guesses ?? [])
  const [currentGuess, setCurrentGuess] = useState("")
  const [status, setStatus] = useState<GameStatus>(initialState?.status ?? "playing")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)

  const evaluate = useCallback(
    (guess: string): LetterStatus[] => {
      const result: LetterStatus[] = Array(WORD_LEN).fill("absent")
      const wordArr = WORD.split("")
      const guessArr = guess.split("")
      const used = Array(WORD_LEN).fill(false)

      guessArr.forEach((l, i) => {
        if (l === wordArr[i]) { result[i] = "correct"; used[i] = true }
      })
      guessArr.forEach((l, i) => {
        if (result[i] === "correct") return
        const idx = wordArr.findIndex((wl, wi) => wl === l && !used[wi])
        if (idx !== -1) { result[i] = "present"; used[idx] = true }
      })

      return result
    },
    [WORD, WORD_LEN]
  )

  const submitGuess = useCallback(async () => {
    const guess = currentGuess.toUpperCase()

    if (guess.length < WORD_LEN) {
      setErrorMessage(`Le mot doit faire ${WORD_LEN} lettres.`)
      return null
    }

    setValidating(true)
    const valid = await verifyWord(guess.toLowerCase())
    setValidating(false)

    if (!valid) {
      setErrorMessage("Ce mot n'existe pas dans le dictionnaire.")
      return null
    }

    setErrorMessage(null)
    const result = evaluate(guess)
    const newRow: GuessRow = { letters: guess.split(""), result }
    const newGuesses = [...guesses, newRow]
    setGuesses(newGuesses)
    setCurrentGuess("")

    const newStatus: GameStatus =
      result.every((r) => r === "correct") ? "won"
      : newGuesses.length >= MAX_TRIES ? "lost"
      : "playing"

    setStatus(newStatus)
    return { _newGuesses: newGuesses, _newStatus: newStatus }
  }, [currentGuess, guesses, evaluate, WORD_LEN, MAX_TRIES])

  const letterStatuses = useCallback((): Record<string, LetterStatus> => {
    const map: Record<string, LetterStatus> = {}
    const priority: Record<LetterStatus, number> = { correct: 2, present: 1, absent: 0 }
    for (const row of guesses) {
      row.letters.forEach((letter, i) => {
        const s = row.result[i]
        if (!map[letter] || priority[s] > priority[map[letter]]) map[letter] = s
      })
    }
    return map
  }, [guesses])

  const addLetter = useCallback(
    (letter: string) => {
      if (currentGuess.length < WORD_LEN && status === "playing" && !validating) {
        setCurrentGuess((prev) => prev + letter)
        setErrorMessage(null)
      }
    },
    [currentGuess.length, WORD_LEN, status, validating]
  )

  const deleteLetter = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1))
    setErrorMessage(null)
  }, [])

  return {
    WORD_LEN, MAX_TRIES, guesses, currentGuess, setCurrentGuess,
    status, errorMessage, validating, submitGuess, addLetter, deleteLetter, letterStatuses,
  }
}