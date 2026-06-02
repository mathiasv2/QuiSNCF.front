import { useState, useCallback } from "react"

export type LetterStatus = "correct" | "present" | "absent"

export interface GuessRow {
  letters: string[]
  result: LetterStatus[]
}

export type GameStatus = "playing" | "won" | "lost"

export function useWordleLogic(word: string) {
  const WORD = word.toUpperCase()
  const WORD_LEN = WORD.length
  const MAX_TRIES = 6

  const [guesses, setGuesses] = useState<GuessRow[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [status, setStatus] = useState<GameStatus>("playing")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const evaluate = useCallback(
    (guess: string): LetterStatus[] => {
      const result: LetterStatus[] = Array(WORD_LEN).fill("absent")
      const wordArr = WORD.split("")
      const guessArr = guess.split("")
      const used = Array(WORD_LEN).fill(false)

      guessArr.forEach((l, i) => {
        if (l === wordArr[i]) {
          result[i] = "correct"
          used[i] = true
        }
      })

      guessArr.forEach((l, i) => {
        if (result[i] === "correct") return
        const idx = wordArr.findIndex((wl, wi) => wl === l && !used[wi])
        if (idx !== -1) {
          result[i] = "present"
          used[idx] = true
        }
      })

      return result
    },
    [WORD, WORD_LEN]
  )

  const submitGuess = useCallback(() => {
    const guess = currentGuess.toUpperCase()

    if (guess.length < WORD_LEN) {
      setErrorMessage(`Le mot doit faire ${WORD_LEN} lettres.`)
      return false
    }

    setErrorMessage(null)
    const result = evaluate(guess)
    const newRow: GuessRow = { letters: guess.split(""), result }
    const newGuesses = [...guesses, newRow]
    setGuesses(newGuesses)
    setCurrentGuess("")

    if (result.every((r) => r === "correct")) {
      setStatus("won")
    } else if (newGuesses.length >= MAX_TRIES) {
      setStatus("lost")
    }

    return true
  }, [currentGuess, guesses, evaluate, WORD_LEN, MAX_TRIES])

  // Map de toutes les lettres tapées avec leur meilleur statut
  const letterStatuses = useCallback((): Record<string, LetterStatus> => {
    const map: Record<string, LetterStatus> = {}
    const priority: Record<LetterStatus, number> = { correct: 2, present: 1, absent: 0 }

    for (const row of guesses) {
      row.letters.forEach((letter, i) => {
        const s = row.result[i]
        if (!map[letter] || priority[s] > priority[map[letter]]) {
          map[letter] = s
        }
      })
    }
    return map
  }, [guesses])

  const addLetter = useCallback(
    (letter: string) => {
      if (currentGuess.length < WORD_LEN && status === "playing") {
        setCurrentGuess((prev) => prev + letter)
        setErrorMessage(null)
      }
    },
    [currentGuess.length, WORD_LEN, status]
  )

  const deleteLetter = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1))
    setErrorMessage(null)
  }, [])

  return {
    WORD_LEN,
    MAX_TRIES,
    guesses,
    currentGuess,
    setCurrentGuess,
    status,
    errorMessage,
    submitGuess,
    addLetter,
    deleteLetter,
    letterStatuses,
  }
}