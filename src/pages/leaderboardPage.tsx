import { Link } from "react-router-dom";
import { LeaderBoard } from "../components/leaderBoard";
import { BestLeaderboard } from "../components/bestLeaderboard";

export function LeaderboardPage(){
    return (
      <><BestLeaderboard name={"Mathias"} score={5000}></BestLeaderboard><LeaderBoard></LeaderBoard></>
    )
}