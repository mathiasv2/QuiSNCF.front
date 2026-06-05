export type LetterStatus = "correct" | "present" | "absent"
 
export interface GuessRow {
  letters: string[]
  result: LetterStatus[]
}
 
export type GameStatus = "playing" | "won" | "lost"
 
export interface WordleState {
  guesses: GuessRow[]
  status: GameStatus
}
 