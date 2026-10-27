import { Link, useParams } from 'react-router'
import { games } from '../data/games'
import type { GameStatus } from '../types/game'

const statusLabels: Record<GameStatus, string> = {
  planned: 'В планах',
  playing: 'Играю',
  completed: 'Пройдена',
  paused: 'Отложена',
  dropped: 'Брошена',
}

export function GameDetailsPage() {
  const { id } = useParams()
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

      <Link to="/games">К списку игр</Link>
    </section>
  )
}