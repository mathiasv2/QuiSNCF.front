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
}