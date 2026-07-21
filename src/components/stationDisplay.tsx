// components/StationDisplay.tsx
import { useDisplayStation } from "../hooks/useDisplay"

export function StationDisplay() {
  const { display, loading, error } = useDisplayStation("nancy")

  if (loading)
    return <div className="text-white p-4">Chargement...</div>
  if (error)
    return <div className="text-amber-400 p-4">{error}</div>

  return (
    <div className="bg-blue-fonce text-white tracking-wide border border-[#1e3a5f] rounded-sm overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-2 text-xs text-slate-400 border-b border-[#1e3a5f]">
        <div className="w-16">Heure</div>
        <div className="flex-1">Destination</div>
        <div className="w-40 hidden sm:block">Train</div>
        <div className="w-28 text-right">Statut</div>
      </div>

      {display?.map((city, index) => {
        const onTime = city.delayMinutes === 0
        return (
          <div
            key={`${city.train}-${index}`}
            className="flex items-center gap-4 px-4 py-3 border-b border-[#1e3a5f] odd:bg-blue-fonce even:bg-blue-clair"
          >
            <div className="w-16 text-2xl text-amber-400 tabular-nums">
              {city.scheduledTime}
            </div>

            <div className="flex-1 text-lg truncate">
              {city.destination}
            </div>

            <div className="w-40 hidden sm:block text-sm text-slate-300 truncate">
              {city.train}
            </div>

            <div
              className={`w-28 text-right text-sm ${
                onTime ? "text-emerald-400" : "text-amber-500"
              }`}
            >
              {onTime ? "À l'heure" : `+${city.delayMinutes} min`}
            </div>
          </div>
        )
      })}
    </div>
  )
}