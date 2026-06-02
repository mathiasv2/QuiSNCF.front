import { GameButton } from "../components/gameButton";

export function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <GameButton square={true} label="🏆" page="leaderboard"/>
      <GameButton square={false} label="Gare du jour" page="game"/>
      <GameButton square={false} label="Mot du jour" page="word"></GameButton>
      <GameButton square={false} label="A venir" page="*" disabled={true}></GameButton>

    </div>
  );
}