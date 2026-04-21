import { useRandomStation } from "../hooks/useRandomStation"
import { useGameLogic } from "../hooks/useGameLogic"
import { ValidateButton } from "../components/button.tsx"
import { GameSkeleton } from "../components/gameSkeleton.tsx"
import { StationImage } from "../components/stationImage.tsx"
import { UserInput } from "../components/userInput.tsx"
import { WinModal } from "../components/winModal"


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

      <div className="flex flex-col items-center gap-18 border-2 border-white rounded-4xl bg-blue-500 py-8 px-20">
        <div className="flex">
        <p className="font-semibold text-3xl text-center text-white">
          Devinez la gare du jour
        </p>
          <button className="rounded-md bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>        
        </div>


        <StationImage src={`${pictureUrl}.jpg`} zoom={zoom} status={status} />


        <div className="flex gap-4">
          <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
          <ValidateButton onClick={handleSubmit} disabled={!guess.trim()} />
        </div>

        
      </div>     
    </>
  )
}