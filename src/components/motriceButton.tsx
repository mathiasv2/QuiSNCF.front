export function MotriceButton() {
  return (
    <button
      className="
        relative
        w-32
        aspect-2470/1284
        cursor-pointer
        transition-transform
        duration-200
        hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      {/* Shape */}
      <svg
        viewBox="0 0 2470 1284"
        xmlns="http://www.w3.org/2000/svg"
        className="
          absolute
          inset-0
          h-full
          w-full
          drop-shadow-xl
        "
      >
        <path
          d="M47.4092 3.95077C17.7785 3.95077 0 17.7785 0 43.4585V1244.49C0 1266.22 13.8277 1284 39.5077 1284H2200.58C2218.36 1284 2234.16 1284 2244.04 1254.37C2244.04 1254.37 2461.33 572.862 2465.28 561.009C2473.18 535.329 2469.23 521.502 2447.5 507.674C1746.24 65.1877 691.385 0 215.317 0C146.178 0 90.8677 3.95077 47.4092 3.95077Z"
          className="fill-amber-500
          "
        />
      </svg>

      <span
        className="
          absolute
          inset-0
          flex
          items-end
          justify-baseline
          p-3
          text-white
          
          font-bold
          tracking-wide
          z-10
          select-none
        "
      >
        Jouer
      </span>
    </button>
  );
}