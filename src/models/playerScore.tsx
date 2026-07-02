export interface PlayerScore {
  name: string
  playedDate: Date   
  score: number     
  tries: number
}

export interface PlayerScoreRaw {
  name: string
  playedDate: string
  score: number
  tries: number
}