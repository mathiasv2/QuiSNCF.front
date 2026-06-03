export const GameType = {
  Station: "Station",
  Word: "Word",
} as const;

export type GameType = typeof GameType[keyof typeof GameType];