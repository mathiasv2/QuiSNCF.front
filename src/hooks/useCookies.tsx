import { useCookies } from 'react-cookie'
import { v4 as uuidv4 } from 'uuid'
import { type WordleState } from '../models/wordleTypes'

const COOKIE_NAME = "game_player"
const COOKIE_PSEUDO = "game_pseudo"

const TODAY = new Date()
TODAY.setHours(23, 59, 59, 0)

const ONE_YEAR = new Date()
ONE_YEAR.setFullYear(ONE_YEAR.getFullYear() + 1)

export type GameType = "station" | "wordle" | "depart"

export function useCookiePlayer(gameType: GameType) {
  const [cookies, setCookie] = useCookies([COOKIE_NAME, COOKIE_PSEUDO])

  const player = cookies[COOKIE_NAME] ?? null
  const savedPseudo = cookies[COOKIE_PSEUDO] ?? null

  const gameData = player?.[gameType] ?? null

  const initPlayer = () => {
    if (player) return
    setCookie(COOKIE_NAME, {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }, { path: "/", expires: TODAY })
  }

  const saveResult = ({ won, tries, city }: { won: boolean; tries: number; city?: string }) => {
    setCookie(COOKIE_NAME, {
      ...player,
      [gameType]: {
        ...gameData,
        result: { won, tries },
        ...(city ? { city } : {}),
      },
    }, { path: "/", expires: TODAY })
  }

  const saveScoreRegistered = () => {
    setCookie(COOKIE_NAME, {
      ...player,
      [gameType]: {
        ...gameData,
        scoreRegistered: true,
      },
    }, { path: "/", expires: TODAY })
  }

  const saveWordleState = (state: WordleState) => {
    setCookie(COOKIE_NAME, {
      ...player,
      [gameType]: {
        ...gameData,
        wordleState: state,
      },
    }, { path: "/", expires: TODAY })
  }

  const savePseudo = (pseudo: string) => {
    setCookie(COOKIE_PSEUDO, pseudo, { path: "/", expires: ONE_YEAR })
  }

  return {
    player,
    gameData,
    initPlayer,
    saveResult,
    saveScoreRegistered,
    saveWordleState,
    savedPseudo,
    savePseudo,
  }
}