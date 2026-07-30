export const GameType = {
  Station: 0,
  Word: 1,
  Display: 2
} as const;

export type GameType = typeof GameType[keyof typeof GameType];