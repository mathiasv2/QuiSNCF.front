import { useState } from "react"
import { useRandomStation, useCheckUserInput } from "./hooks/useRandomStation"

function App() {
  const { station, loading, error } = useRandomStation()
  const { checkInput } = useCheckUserInput()
  const [input, setInput] = useState("")

  if (loading) return <p>Chargement...</p>
  if (error) return <p>{error}</p>
  if (!station) return <p>Aucune station disponible</p>

  const handleSubmit = async () => {
    const result = await checkInput(input)
    console.log(result)
  }

  return (
    <>
      <div className="bg-black">
        <h1 className="text-3xl">{station.name}</h1>
        <p>{station.city}</p>
        <p>{station.hint}</p>
        <img src={`/public/${station.pictureUrl}`} />
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Votre réponse..."
        />
        <button onClick={handleSubmit}>Valider</button>
      </div>
    </>
  )
}

export default App