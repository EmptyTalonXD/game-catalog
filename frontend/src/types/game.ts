export type GameStatus =
  | 'planned'
  | 'playing'
  | 'completed'
  | 'paused'
  | 'dropped'

export type Game = {
  id: string
  title: string
  description: string
  platform: string
  genre: string
  status: GameStatus
  rating: number | null
  achievementProgress: number | null
  note: string
}

