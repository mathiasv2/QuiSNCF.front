import { useState } from "react"
import { GameType } from "../enums/gameType"
import { useBillboard, useBillboardByGameType } from "../hooks/useBillboard"
import { LeaderboardList } from "../components/leaderBoard"

const TABS = [
  { label: "Global", style: "bg-nude text-burgundy", value: "global" as const, emoji: "👑", title: "Simplement le meilleur" },
  { label: "Gares", style: "bg-menthe text-foret", value: GameType.Station, emoji: "🚉", title: "Roi des gares"  },
  { label: "Mots", style: "bg-horizon text-marine", value: GameType.Word,  emoji: "🔤", title: "Maître des mots"  },
  { label: "Départ", style: "bg-peche text-ocre", value: GameType.Display,  emoji: "🔤", title: "Protégé de Saint Christophe"  },

] satisfies { label: string; style: string; value: "global" | GameType; emoji: string; title: string }[]

type Tab = typeof TABS[number]["value"]

export function LeaderboardContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("global")

  const current = TABS.find((t) => t.value === activeTab)!

  return (
    <div className="flex flex-col items-center gap-4 max-w-md mx-auto px-4 w-full">
      <div className="flex w-full rounded-xl bg-parme p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
              ${activeTab === tab.value
                ? `${tab.style} shadow-sm`
                : "text-aubergine/50 hover:text-aubergine/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "global"
        ? <GlobalBoard style={current.style} emoji={current.emoji} title={current.title} />
        : <GameTypeBoard gametype={activeTab} style={current.style} emoji={current.emoji} title={current.title} />
      }
    </div>
  )
}

interface BoardProps {
  style: string
  emoji: string
  title: string
}

function GlobalBoard({ style, emoji, title }: BoardProps) {
  const { billboard, loading, error } = useBillboard()
  if (loading) return <Loader />
  if (error)   return <Error message={error} />
  return <LeaderboardList billboard={billboard} style={style} emoji={emoji} title={title} />
}

function GameTypeBoard({ gametype, style, emoji, title }: BoardProps & { gametype: GameType }) {
  const { billboard, loading, error } = useBillboardByGameType(gametype)
  if (loading) return <Loader />
  if (error)   return <Error message={error} />
  return <LeaderboardList billboard={billboard} style={style} emoji={emoji} title={title} />
}

function Loader() {
  return <p className="text-center text-white/60 py-10">Chargement...</p>
}

function Error({ message }: { message: string }) {
  return <p className="text-center text-red-400 py-10">{message}</p>
}