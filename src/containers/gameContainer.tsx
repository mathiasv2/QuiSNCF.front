import { useRandomStation } from "../hooks/useRandomStation"
import { useGameLogic } from "../hooks/useGameLogic"
import { ValidateButton } from "../components/button.tsx"
import { GameSkeleton } from "../components/gameSkeleton.tsx"
import { StationImage } from "../components/stationImage.tsx"
import { UserInput } from "../components/userInput.tsx"
import { WinModal } from "../components/winModal"


const MAX_ATTEMPTS = 12
export function GameContainer() {
  const { station, loading, error } = useRandomStation()

  if (loading) return <GameSkeleton />
  if (error || !station) return (
    <p className="text-red-400 text-center">{error ?? "Aucune station disponible"}</p>
  )

  return <GameInner city={station.city} pictureUrl={station.pictureUrl} />
}

function GameInner({ city, pictureUrl }: { city: string; pictureUrl: string }) {
  const { guess, setGuess, zoom, guessCount, status, handleSubmit } = useGameLogic(city)

  return (
    <>
      {status === "won" && (
        <WinModal
          city={city}
          guessCount={guessCount}
          maxAttempts={MAX_ATTEMPTS}
          onClose={() => {}}
        />
      )}

      <div className="flex flex-col items-center gap-20 border-2 border-white rounded-xl bg-blue-500 py-8 px-20">
        <p className="font-semibold text-3xl text-center text-white">
          Devinez la gare du jour
        </p>

        <StationImage src={`${pictureUrl}.jpg`} zoom={zoom} />


        <div className="flex gap-4">
          <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
          <ValidateButton onClick={handleSubmit} disabled={!guess.trim()} />
        </div>
      </div>
    </>
  )
}