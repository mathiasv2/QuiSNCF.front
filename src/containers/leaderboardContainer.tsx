import { useState } from "react"
import { GameType } from "../enums/gameType"
import { useBillboard, useBillboardByGameType } from "../hooks/useBillboard"
import { LeaderboardList } from "../components/leaderBoard";

const TABS = [
  { label: "Global",  value: "global"          as const },
  { label: "Gares",   value: GameType.Station             },
  { label: "Mots",    value: GameType.Word                },
] satisfies { label: string; value: "global" | GameType }[]

type Tab = typeof TABS[number]["value"]

export function LeaderboardContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("global")

  return (
    <div className="flex flex-col items-center gap-4 max-w-md mx-auto px-4 w-full">
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

      {activeTab === "global"
        ? <GlobalBoard />
        : <GameTypeBoard gametype={activeTab} />
      }
    </div>
  )
}

function GlobalBoard() {
  const { billboard, loading, error } = useBillboard()
  if (loading) return <Loader />
  if (error)   return <Error message={error} />
  return <LeaderboardList billboard={billboard} />
}

function GameTypeBoard({ gametype }: { gametype: GameType }) {
  const { billboard, loading, error } = useBillboardByGameType(gametype)
  if (loading) return <Loader />
  if (error)   return <Error message={error} />
  return <LeaderboardList billboard={billboard} />
}

function Loader() {
  return <p className="text-center text-white/60 py-10">Chargement...</p>
}

function Error({ message }: { message: string }) {
  return <p className="text-center text-red-400 py-10">{message}</p>
}