import { useRandomStation } from "../hooks/useRandomStation"
import { useGameLogic } from "../hooks/useGameLogic"
import { ValidateButton } from "../components/button.tsx"
import { GameSkeleton } from "../components/gameSkeleton.tsx"
import { StationImage } from "../components/stationImage.tsx"
import { UserInput } from "../components/userInput.tsx"
import { WinModal } from "../components/winModal"
import { HintButton } from "../components/hintButton.tsx"
import { useEffect, useState } from "react"


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
  const [showModal, setShowModal] = useState(status === "won")

  useEffect(() => {
    if (status === "won") setShowModal(true)
  }, [status])
  return (
    <>
      {showModal && (
        <WinModal city={city} guessCount={guessCount} onClose={() => setShowModal(false)} />
      )}

      <div className="flex flex-col items-center w-full max-w-xl rounded-2xl md:rounded-4xl bg-parme py-4 px-10 md:px-20">
        <p className="font-semibold text-xl md:text-3xl text-center text-aubergine pt-4 md:pt-6">
          Devinez la gare du jour
        </p>

        <div className="py-6 md:py-9 flex flex-col gap-y-3 w-full items-center">
          <StationImage src={`/gares/${pictureUrl}.jpg`} zoom={zoom} status={status} x={x} y={y}/>
          <HintButton hint={hint} tries={guessCount} />
        </div>

        <div className="flex w-full mb-3 gap-x-1 px-1">
          <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
          <ValidateButton onClick={handleSubmit} disabled={!guess.trim() || status === "won"} />
        </div>
      </div>
    </>
  )
}