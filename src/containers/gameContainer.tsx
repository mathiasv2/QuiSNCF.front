import { useRandomStation } from "../hooks/useRandomStation"
import { useGameLogic } from "../hooks/useGameLogic"
import { ValidateButton } from "../components/button.tsx"
import { GameSkeleton } from "../components/gameSkeleton.tsx"
import { StationImage } from "../components/stationImage.tsx"
import { UserInput } from "../components/userInput.tsx"
import { WinModal } from "../components/winModal"
import { HintButton } from "../components/hintButton.tsx"


export function GameContainer() {
  const { station, loading, error } = useRandomStation()


  if (loading) return <GameSkeleton />
  if (error || !station) return (
    <p className="text-red-400 text-center">{error ?? "Aucune station disponible"}</p>
  )

  return <GameInner city={station.city} pictureUrl={station.pictureUrl} hint={station.hint} x={station.x} y={station.y}/>
}

function GameInner({ city, pictureUrl, hint, x, y }: { city: string; pictureUrl: string, hint:string, x:number, y:number }) {
  const { guess, setGuess, zoom, guessCount, status, handleSubmit } = useGameLogic(city)

  return (
    <>
      {status === "won" && (
        <WinModal
          city={city}
          guessCount={guessCount}
        />
      )}

      <div className="flex flex-col items-center rounded-4xl bg-parme py-4 px-20">
        <div className="flex">
        <p className="font-semibold text-3xl text-center text-aubergine pt-6">
          Devinez la gare du jour
        </p>     
        </div>


        <div className="py-9 flex flex-col gap-y-3">
          <StationImage src={`${pictureUrl}.jpg`} zoom={zoom} status={status} x={x} y={y} />
          <HintButton hint={hint} tries={guessCount}/>
        </div>



        <div className="flex my-3 gap-x-3">
          <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
          <ValidateButton onClick={handleSubmit} disabled={!guess.trim()} />
        </div>

        
      </div>     
    </>
  )
}