import { useCookies } from 'react-cookie'

const COOKIE_PSEUDO = "game_pseudo"

export function usePseudo() {
  const [cookies] = useCookies([COOKIE_PSEUDO])
  return cookies[COOKIE_PSEUDO] ?? null
}