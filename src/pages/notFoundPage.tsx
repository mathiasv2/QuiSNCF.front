export function NotFound() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
      <img
        src="public/KC8Z_nc_standard.png"
        className="h-96 opacity-90 drop-shadow-md"
      />
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground text-white">
          Erreur 404
        </span>
        <h3 className="text-base text-muted-foreground text-white">
          Vous vous êtes trompé de chemin? :(
        </h3>
      </div>
    </div>
  );
}