import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid'; 


const COOKIE_NAME = "game_player"
const TODAY = new Date()
TODAY.setHours(23, 59, 59, 0)

export function useCookiePlayer(){
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);


  const player = cookies[COOKIE_NAME] ?? null;

  const initPlayer = () => {
    if (player) return;
    setCookie(COOKIE_NAME, {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      result: null,
    }, {path: "/", expires:TODAY})
  }

  const saveScoreRegistered = () => {
  setCookie(COOKIE_NAME, {
    ...player,
    scoreRegistered: true,
  }, { path: "/", expires: TODAY })
}

  const saveResult = ({ won, tries }: { won: boolean; tries: number }) => {
      setCookie(COOKIE_NAME, {
        ...player,
        result: {won, tries}, 
      }, {path:"/", expires:TODAY})
    }


  return {player, initPlayer, saveResult, saveScoreRegistered}



}