interface Props {
  name: string
  score: number
}


export function BestLeaderboard({name, score}: Props) {
  return (
  <div className="flex justify-center">

    <div className="flex flex-col px-10 py-4 rounded-2xl bg-linear-to-r from-purple-800 to-orange-500 shadow-lg shadow-indigo-950">
      <div className="flex gap-2">
        <p className="text-4xl place-self-center">🏆</p>
        <div className="bg-linear-to-r from-yellow-300 to-amber-400 px-4 py-2 rounded-4xl">
          <h2 className="text-2xl text-black font-achemine font-bold">Numéro 1 !</h2>
        </div>
      </div>
      <p className="text-4xl shadow-2xl font-achemine font-bold text-shadow-lg text-shadow-gray-400 uppercase mt-3">{name}</p>
      <p className="text-2xl">{score} pts</p>
    </div>

  </div>
  )
}