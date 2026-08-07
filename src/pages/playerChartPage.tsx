import { useState } from "react"
import { PlayerChartContainer } from "../containers/playerChartContainer"
import { GameType } from "../enums/gameType"
import { usePseudo } from "../hooks/usePseudo"
import { TotalScoreContainer } from "../containers/totalScorePlayerContainer"

const TABS = [
  { label: "Gares", value: GameType.Station },
  { label: "Mots",  value: GameType.Word    },
  { label: "Départs",  value: GameType.Display    },
] as const

export function PlayerChartPage() {
  const [activeTab, setActiveTab] = useState<GameType>(GameType.Station)
  const name = usePseudo()

  if (!name) return (
    <p className="text-center text-white py-6 text-sm">
      Enregistrez un score sur cet appareil pour voir vos statistiques.
    </p>
  )

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto px-4 w-full">
      <div className="flex w-full rounded-xl bg-parme p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
              ${activeTab === tab.value
                ? "bg-aubergine text-white shadow-sm"
                : "text-aubergine/50 hover:text-aubergine/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TotalScoreContainer name={name} gametype={activeTab} />
      <PlayerChartContainer name={name} gametype={activeTab} />
    </div>
  )
}