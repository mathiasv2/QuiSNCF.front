import { useState } from "react"
import { useRandomStation, useCheckUserInput } from "./hooks/useRandomStation"
import { ZoomImage } from "./components/station-image"
import { TextInput } from "./components/answser-input"

const ZOOM_LEVELS = [400, 300, 200, 150, 120, 100];


function App() {
  const { station, loading, error } = useRandomStation()
  const { checkInput } = useCheckUserInput()
  const [input, setInput] = useState("")
  const [attempts, setAttempts] = useState(0);

  if (loading) return <p>Chargement...</p>
  if (error) return <p>{error}</p>
  if (!station) return <p>Aucune station disponible</p>

  const handleSubmit = async () => {
    if (!(await checkInput(input))) {
      setAttempts((a) => Math.min(a + 1, ZOOM_LEVELS.length - 1));
    }
    setInput("");
  };
    
return (
    <div className="bg-black">
      <h1 className="text-3xl text-white">{station.name}</h1>
      <p>{station.city}</p>
      <p>{station.hint}</p>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4 justify-center">
          <ZoomImage src="/metz.jpg" zoom={ZOOM_LEVELS[attempts]} />
        </div>
        <div className="flex flex-row justify-center pt-2 gap-2">
          <TextInput
            value={input}
            onChange={setInput}
            placeholder="Votre réponse.."
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-2xl text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 font-medium text-m text-center leading-5"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default App