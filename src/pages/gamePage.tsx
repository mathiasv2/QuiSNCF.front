import { GameContainer } from "../containers/gameContainer";

export function GamePage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚉</span>
          <h1 className="text-white font-semibold tracking-tight">GareWordle</h1>
        </div>
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Devinez la gare</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <GameContainer />
      </main>

      <footer className="border-t border-white/10 px-6 py-3 text-center">
        <p className="text-xs text-zinc-600">Nouvelle gare chaque jour</p>
      </footer>
    </div>
  )
}