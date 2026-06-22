// import { useEffect, useState } from "react";
// import { type PlayerScore } from "../models/playerScore";
// import { getLeaderboardByNameAndGametype } from "../services/playerService";
// import type { GameType } from "../enums/gameType";

// export function usePlayerChart(name: string, gameType: GameType){
//   const [playerChart, setPlayerChart] = useState<PlayerScore[]>([]);
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     getLeaderboardByNameAndGametype(name, gameType)
//     .then(setPlayerChart)
//     .catch(() => setError("Impossible de charger vos performances"))
//     .finally(() => setLoading(false))
//   }, [])

//   return {playerChart, loading, error}
// }