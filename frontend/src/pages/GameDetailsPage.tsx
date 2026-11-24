import { Link, useNavigate, useParams } from 'react-router'
import type { Game, GameStatus } from '../types/game'

const statusLabels: Record<GameStatus, string> = {
  planned: 'В планах',
  playing: 'Играю',
  completed: 'Пройдена',
  paused: 'Отложена',
  dropped: 'Брошена',
}

type GameDetailsPageProps = {
  games: Game[]
  onDelete: (id: string) => void
}

export function GameDetailsPage({
  games,
  onDelete,
}: GameDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find((item) => item.id === id)

  if (!game) {
    return (
      <section>
        <h1>Игра не найдена</h1>
        <p>В каталоге нет игры с таким идентификатором.</p>
        <Link to="/games">К списку игр</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{game.title}</h1>
      <p>{game.description}</p>

      <dl>
        <dt>Идентификатор</dt>
        <dd>{game.id}</dd>

        <dt>Платформа</dt>
        <dd>{game.platform}</dd>

        <dt>Жанр</dt>
        <dd>{game.genre}</dd>

        <dt>Статус</dt>
        <dd>{statusLabels[game.status]}</dd>

        <dt>Оценка</dt>
        <dd>
          {game.rating === null ? 'Не выставлена' : `${game.rating}/10`}
        </dd>

        <dt>Достижения</dt>
        <dd>
          {game.achievementProgress === null
            ? 'Не указаны'
            : `${game.achievementProgress}%`}
        </dd>

        <dt>Заметка</dt>
        <dd>{game.note || 'Заметки пока нет.'}</dd>
      </dl>

      <p>
        <Link to={`/games/${game.id}/edit`}>Редактировать игру</Link>
      </p>

      <p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Удалить игру «${game.title}»?`)) {
              onDelete(game.id)
              navigate('/games', { replace: true })
            }
          }}
        >
          Удалить игру
        </button>
      </p>

      <Link to="/games">К списку игр</Link>
    </section>
  )
}