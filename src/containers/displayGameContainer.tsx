import { useEffect, useState } from "react"
import { StationDisplay } from "../components/stationDisplay"
import { UserInput } from "../components/userInput"
import { ValidateButton } from "../components/button"
import { WinModal } from "../components/winModal"
import { GameType } from "../enums/gameType"
import { useDisplayGameLogic } from "../hooks/useDisplayGameLogic"

export function DisplayGameContainer() {
  const { guess, setGuess, guessCount, status, cityName, wrongGuess, checking, handleSubmit } = useDisplayGameLogic()
  const [showModal, setShowModal] = useState(status === "won")

  useEffect(() => {
    if (status === "won") setShowModal(true)
  }, [status])

  return (
    <>
      {showModal && (
        <WinModal city={cityName} guessCount={guessCount} onClose={() => setShowModal(false)} gametype={GameType.Display} />
      )}

      <div className="flex flex-col items-center w-full max-w-3xl rounded-2xl md:rounded-4xl bg-parme py-4 px-3 sm:px-6 md:px-10">
        <p className="font-semibold text-xl md:text-3xl text-center text-aubergine pt-4 md:pt-6">
          Devinez la ville de la gare de départ
        </p>

        <div className="py-6 md:py-9 w-full">
          <StationDisplay />
        </div>

        <div className="min-h-[1.4rem] mb-2 text-center">
          {wrongGuess && status === "playing" && (
            <p className="text-sm font-semibold text-aubergine/80">
              Ce n'est pas le bon départ... ({guessCount} {guessCount > 1 ? "essais" : "essai"})
            </p>
          )}
        </div>

        <div className="flex w-full mb-3 gap-x-3 px-1">
          <UserInput value={guess} onChange={setGuess} onEnter={handleSubmit} />
          <ValidateButton onClick={handleSubmit} disabled={!guess.trim() || status === "won" || checking} />
        </div>
      </div>
    </>
  )
}
