import { useNavigate } from "react-router-dom";

interface Props {
  square?: boolean;
  label: string;
  page: string;
  disabled?: boolean;
}

export function GameButton({
  square = false,
  label,
  page,
  disabled = false,
}: Props) {
  const navigate = useNavigate();

  const className = `
    relative
    flex
    items-center
    justify-center

    rounded-4xl
    border-2
    border-aubergine

    bg-lavande
    text-white
    font-bold

    shadow-[0_6px_0_0_theme(colors.aubergine)]

    transition-all
    duration-100

    hover:brightness-110
    hover:-translate-y-px

    active:translate-y-px
    active:shadow-[0_2px_0_0_theme(colors.aubergine)]

    select-none

    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:brightness-100
    disabled:hover:translate-y-0
    disabled:active:translate-y-0
    disabled:shadow-none

    ${
      square
        ? `
          w-15
          h-15
          text-2xl
        `
        : `
          w-64
          py-3
          text-lg
        `
    }
  `;

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={() => {
        if (!disabled) {
          navigate(`/${page}`);
        }
      }}
    >
      {label}
    </button>
  );
}