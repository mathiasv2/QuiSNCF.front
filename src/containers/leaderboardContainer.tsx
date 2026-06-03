import { useState } from "react"
import { GameType } from "../enums/gameType"
import { useBillboard, useBillboardByGameType } from "../hooks/useBillboard"
import { LeaderboardList } from "../components/leaderBoard";

const TABS = [
  { label: "Global", style: "bg-nude",  value: "global" as const },
  { label: "Gares", style: "bg-menthe",  value: GameType.Station },
  { label: "Mots",  style: "bg-cobalt",  value: GameType.Word },
] satisfies { label: string; style: string; value: "global" | GameType }[]

type Tab = typeof TABS[number]["value"]

export function LeaderboardContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("global")
  const [styleTab, setStyleTab ] = useState<string>("bg-orange-300")

  return (
    <div className="flex flex-col items-center gap-4 max-w-md mx-auto px-4 w-full ">
      <div className="flex w-full rounded-xl bg-parme p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value)
              setStyleTab(tab.style)
}}            className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
              ${activeTab === tab.value
                ? `${tab.style} text-white shadow-sm`
                : "text-aubergine/50 hover:text-aubergine/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "global"
        ? <GlobalBoard style={styleTab}/>
        : <GameTypeBoard gametype={activeTab} style={styleTab} />
      }
    </div>
  )
}

function GlobalBoard({ style }: { style: string }) {

  const { billboard, loading, error } = useBillboard()
  if (loading) return <Loader />
  if (error)   return <Error message={error} />
  return <LeaderboardList billboard={billboard} style={style} />
}

function GameTypeBoard({ gametype, style }: { gametype: GameType, style: string }) {
  const { billboard, loading, error } = useBillboardByGameType(gametype)
  if (loading) return <Loader />
  if (error)   return <Error message={error} />
  return <LeaderboardList billboard={billboard} style={style} />
}

function Loader() {
  return <p className="text-center text-white/60 py-10">Chargement...</p>
}

function Error({ message }: { message: string }) {
  return <p className="text-center text-red-400 py-10">{message}</p>
}