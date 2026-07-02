import { GameButton } from "../components/gameButton";

export function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <div className="flex gap-4">
        <GameButton square label="🏆" page="leaderboard" />
        <GameButton square label="📈" page="chart" />
      </div>
      
      <GameButton label="Gare du jour" page="game" />

      <div className="relative">
        <GameButton label="Mot du jour" page="word" />

        <span
          className="
            absolute
            -top-2
            -right-3
            rotate-12
            rounded-full
            bg-pink-500
            px-2
            py-0.5
            text-[10px]
            font-extrabold
            text-white
            shadow-md
            animate-pulse
          "
        >
          Nouveau
        </span>
      </div>

      <GameButton label="A venir" page="*" disabled />
    </div>
  );
}