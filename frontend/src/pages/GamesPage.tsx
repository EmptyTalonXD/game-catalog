import { useState } from 'react'
import { Link } from 'react-router'
import { GameCard } from '../components/GameCard'
import type { Game, GameStatus } from '../types/game'

type GamesPageProps = {
  games: Game[]
}

export function GamesPage({ games }: GamesPageProps) {
  const [status, setStatus] = useState<GameStatus | 'all'>('all')

  const visibleGames = games.filter((game) =>
    status === 'all' || game.status === status
  )

  return (
    <section>
      <h1>Мои игры</h1>
      <Link to="/games/new">Добавить игру</Link>

      <div className="game-filter">
        <label htmlFor="status-filter">Статус прохождения</label>

        <select
          id="status-filter"
          value={status}
          onChange={(event) => {
            const value = event.target.value

            if (
              value === 'all' ||
              value === 'planned' ||
              value === 'playing' ||
              value === 'completed' ||
              value === 'paused' ||
              value === 'dropped'
            ) {
              setStatus(value)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="planned">В планах</option>
          <option value="playing">Играю</option>
          <option value="completed">Пройдена</option>
          <option value="paused">Отложена</option>
          <option value="dropped">Брошена</option>
        </select>

        <button type="button" onClick={() => setStatus('all')}>
          Сбросить фильтр
        </button>
      </div>

      {games.length === 0 ? (
        <p>Игр пока нет. Добавьте первую игру.</p>
      ) : visibleGames.length === 0 ? (
        <p>Нет игр с выбранным статусом. Попробуйте другой фильтр.</p>
      ) : (
        <div className="game-list">
          {visibleGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}