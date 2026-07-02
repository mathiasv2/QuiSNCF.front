export function NewTag(){
  // NE PAS OUBLIER DE METTRE LE BOUTON SUR LEQUEL ON VEUT LE METTRE DANS UNE DIV EN RELATIVE
  return (
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
  )
}