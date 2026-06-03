interface Props {
  name: string;
  score: number;
  style: string;
  emoji: string;
  title: string;
}

export function BestLeaderboard({
  name,
  score,
  style,
  emoji,
  title,
}: Props) {
  return (
    <div
      className={`
        relative
        w-full
        overflow-hidden
        rounded-3xl
        border-2
        border-amber-300
        px-8
        py-7
        flex
        flex-col
        items-center
        gap-2

        shadow-[0_0_20px_rgba(251,191,36,0.35)]
        ${style}
      `}
    >


      <div className="relative mb-2">
        <div className="absolute inset-0 scale-150 rounded-full bg-yellow-300/40 blur-xl animate-pulse" />

        <span className="relative text-6xl drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-bounce">
          {emoji}
        </span>
      </div>

      <div
        className="
          rounded-full
          bg-linear-to-r
          from-yellow-300
          via-amber-400
          to-yellow-300
          px-4
          py-1
          shadow-lg
        "
      >
        <p className="text-[10px] font-black tracking-[0.25em] uppercase text-amber-950">
          {title}
        </p>
      </div>

      <p className={`${style} font-bold text-3xl tracking-tight`}>{name}</p>

      <div
        className="
          mt-2
          flex
          items-baseline
          gap-2

          rounded-full
          border
          border-amber-300

          bg-linear-to-r
          from-yellow-400/20
          via-yellow-200/30
          to-yellow-400/20

          px-6
          py-2

          shadow-[0_0_15px_rgba(251,191,36,0.35)]
        "
      >
        <span className="text-2xl font-black text-amber-500 tabular-nums">
          {score.toLocaleString()}
        </span>

        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
          pts
        </span>
      </div>
    </div>
  );
}


