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

  return <GameInner city={station.city} pictureUrl={station.pictureUrl} hint={station.hint} />
}

function GameInner({ city, pictureUrl, hint }: { city: string; pictureUrl: string, hint:string }) {
  const { guess, setGuess, zoom, guessCount, status, handleSubmit } = useGameLogic(city)

  return (
    <>
      {status === "won" && (
        <WinModal
          city={city}
          guessCount={guessCount}
        />
      )}

      <div className="flex flex-col items-center border-2 border-white rounded-4xl bg-blue-500 py-4 px-20">
        <div className="flex">
        <p className="font-semibold text-3xl text-center text-white pt-6">
          Devinez la gare du jour
        </p>     
        </div>


        <div className="py-9 flex flex-col gap-y-3">
          <StationImage src={`${pictureUrl}.jpg`} zoom={zoom} status={status} />
          <HintButton hint={hint} tries={guessCount}/>
        </div>



        <div className="flex mt-4 gap-x-3">
          <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
          <ValidateButton onClick={handleSubmit} disabled={!guess.trim()} />
        </div>

        
      </div>     
    </>
  )
}