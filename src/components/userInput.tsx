interface Props {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
}

export function UserInput({ value, onChange, onEnter }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter?.()
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Nom de la gare..."
      className="flex-1 py-2.5 px-4 rounded-full border-2 border-white bg-white/10 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-all duration-200"
    />
  )
}