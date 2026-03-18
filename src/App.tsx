import { useRandomStation } from "./hooks/useRandomStation"

function App() {
   const { station, loading, error } = useRandomStation()

  if (loading) return <p>Chargement...</p>
  if (error) return <p>{error}</p>
  if (!station) return <p>Aucune station disponible</p>

  return (
    <div>
      <h1>{station.name}</h1>
      <p>{station.city}</p>
      <p>{station.hint}</p>
      <img src={`/public/${station.pictureUrl}`} />
    </div>
  )
}

export default App
