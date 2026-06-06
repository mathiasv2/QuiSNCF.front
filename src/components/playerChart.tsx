import { LineChart } from "@mui/x-charts/LineChart";
import type { PlayerScore } from "../models/playerScore";

interface Props {
  playerScore: PlayerScore[];
}

export function PlayerChart({ playerScore }: Props) {
  return (
    <LineChart
      xAxis={[
        {
          scaleType: "time",
          data: playerScore.map((item) => item.playedDate),
        },
      ]}
      series={[
        {
          label: "Score",
          data: playerScore.map((item) => item.Score),
        },
      ]}
      height={300}
    />
  );
}