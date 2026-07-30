import { GameButton } from "../components/gameButton";
import { NewTag } from "../components/newTag";

export function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <div className="flex gap-4">
        <GameButton square label="🏆" page="leaderboard" />
        <div className="relative">
          <GameButton square label="📈" page="chart" />
        </div>
      </div>
      
      <GameButton label="Gare du jour" page="game" />

      <div className="relative">
        <GameButton label="Mot du jour" page="word" />
      </div>

      <div className="relative">
        <GameButton label="Départ du jour" page="display" />
        <NewTag></NewTag>
      </div>
    </div>
  );
}