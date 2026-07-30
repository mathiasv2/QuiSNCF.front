import type { GameType } from "../enums/gameType"

export interface Player {
  name: string
  tries: number
  score: number
  gameType: GameType
  proof?: string | null
}