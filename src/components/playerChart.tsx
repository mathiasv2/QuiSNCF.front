import { LineChart } from "@mui/x-charts/LineChart"
import type { PlayerScore } from "../models/playerScore"

interface Props {
  playerScore: PlayerScore[]
}

export function PlayerChart({ playerScore }: Props) {
  return (
    <div className="bg-parme rounded-2xl px-2 pt-4 pb-2">
      <LineChart
        xAxis={[{
          scaleType: "time",
          data: playerScore.map((item) => item.playedDate),
          valueFormatter: (date: Date) =>
            date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
        }]}
        yAxis={[{
          width: 55,
        }]}
        series={[{
          label: "Score",
          data: playerScore.map((item) => item.score),
          color: "#3D1A5C",
          showMark: true,
          valueFormatter: (value, context) => {
            if (context.dataIndex === undefined) return `${value} pts`
            const entry = playerScore[context.dataIndex]
            return `${value} pts — ${entry.tries} essai${entry.tries > 1 ? "s" : ""}`
          },
        }]}
        height={300}
        sx={{
          "& .MuiChartsGrid-line": { stroke: "rgba(61,26,92,0.08)" },
          "& .MuiChartsAxis-tickLabel": {
            fill: "rgba(61,26,92,0.55)",
            fontSize: "11px !important",
          },
          "& .MuiLineElement-root": { strokeWidth: 2.5 },
          "& .MuiMarkElement-root": {
            fill: "#fff",
            stroke: "#3D1A5C",
            strokeWidth: 2,
            r: 4,
          },
          "& .MuiChartsLegend-label": {
            fill: "rgba(61,26,92,0.7)",
            fontSize: "12px",
          },
          "& .MuiChartsTooltip-root": {
            background: "rgba(232,224,240,0.95)",
            border: "1px solid rgba(61,26,92,0.15)",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(61,26,92,0.12)",
          },
          "& .MuiChartsTooltip-cell": { color: "#3D1A5C" },
        }}
        grid={{ horizontal: true }}
        hideLegend={true}
      />
    </div>
  )
}