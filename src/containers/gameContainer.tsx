import { useRandomStation } from "../hooks/useRandomStation"
import { StationImage } from "../components/stationImage"
import { ValidateButton } from "../components/button"
import { UserInput } from "../components/userInput"
import { useState } from "react"


const ZOOM_LEVELS = [1000, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 120, 100]


export function GameContainer() {
  const { station, loading, error } = useRandomStation()
  const [guess, setGuess] = useState("")
  const [guessCounter, setGuessCounter] = useState(0);

  const handleSubmit = () => {
    if (guess.trim().toLowerCase() != station?.city.toLowerCase())
      setGuessCounter(guessCounter+1)
    console.log(guessCounter)

}




  if (loading) return <GameSkeleton />
  if (error || !station) return <p className="text-red-400 text-center">{error ?? "Aucune station disponible"}</p>

  return (
    <div className="flex flex-col items-center gap-20 border-2 border-white rounded-xl bg-blue-500 py-8 px-20">
      <p className="font-semibold text-3xl text-center text-blue ">Devinez la gare du jour</p>

      <StationImage
        src={`${station.pictureUrl}.jpg`}
        zoom={ZOOM_LEVELS[guessCounter]}
      />
      <div className="flex gap-4">
      <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
      <ValidateButton onClick={handleSubmit} disabled={!guess.trim()} />
      </div>



    </div>
  )
}

function GameSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto animate-pulse">
      <div className="h-12 w-full bg-white/10 rounded-lg" />
      <div className="w-64 h-64 rounded-xl bg-white/10" />
      <div className="h-4 w-40 bg-white/10 rounded-full" />
    </div>
  )
}