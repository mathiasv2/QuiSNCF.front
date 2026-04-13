interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="border-black border-2 p-1 rounded-2xl text-white" >
        <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "Ville de cette gare..."}/>
    </div>

  );
}import { useState, type KeyboardEvent } from "react"

interface Props {
  onSubmit: (value: string) => Promise<void>
}

export function AnswerForm({ onSubmit }: Props) {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!value.trim() || loading) return
    setLoading(true)
    await onSubmit(value.trim())
    setValue("")
    setLoading(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nom de la gare..."
        disabled={loading}
        className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || !value.trim()}
        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
      >
        Valider
      </button>
    </div>
  )
}