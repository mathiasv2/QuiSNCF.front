import { GameContainer } from "../containers/gameContainer";

export function GamePage() {
  return (
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[url(src/assets/identites_0.jpg.webp)] bg-no-repeat bg-cover bg-center min-h-screen">
        <GameContainer />
      </div>
  )
}