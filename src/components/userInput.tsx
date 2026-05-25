interface Props {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
}

export function UserInput({ value, onChange, onEnter }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter?.()
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 300)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      placeholder="Ville de la gare..."
      className="flex-1 min-w-0 py-2.5 px-4 rounded-full border-2 border-white bg-white/10 text-lavande placeholder-aubergine outline-none focus:bg-white/20 transition-all duration-200 text-base"
    />
  )
}