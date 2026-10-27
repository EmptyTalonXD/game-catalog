import { Link } from 'react-router'
import type { Game, GameStatus } from '../types/game'

const statusLabels: Record<GameStatus, string> = {
  planned: 'В планах',
  playing: 'Играю',
  completed: 'Пройдена',
  paused: 'Отложена',
  dropped: 'Брошена',
}

type GameCardProps = {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="game-card">
      <h2>
        <Link to={`/games/${game.id}`}>{game.title}</Link>
      </h2>

      <p>{game.description}</p>
      <p>Платформа: {game.platform}</p>
      <p>Статус: {statusLabels[game.status]}</p>
      <p>
        Достижения:{' '}
        {game.achievementProgress === null
          ? 'не указаны'
          : `${game.achievementProgress}%`}
      </p>
    </article>
  )
}