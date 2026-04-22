interface Props {
  onClick?: () => void
  disabled?: boolean
  label?: string
}

export function ValidateButton({ onClick, disabled = false}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-lavande hover:bg-aubergine active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-200 shadow-md"
    >Deviner</button>
  )
}