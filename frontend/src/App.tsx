import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import type { Game, GameDraft } from './types/game'
import { games as initialGames } from './data/games'
import { AppLayout } from './app/AppLayout'
import { GamesPage } from './pages/GamesPage'
import { GameDetailsPage } from './pages/GameDetailsPage'
import { NewGamePage } from './pages/NewGamePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { EditGamePage } from './pages/EditGamePage'
import './App.css'

export default function App() {
  const [games, setGames] = useState<Game[]>(() =>
    initialGames.map((game) => ({ ...game }))
  )

  function deleteGame(id: string): void {
    setGames((current) =>
      current.filter((game) => game.id !== id)
    )
  }
  function createGame(draft: GameDraft): string {
    const id = crypto.randomUUID()

    setGames((current) => [
      ...current,
      { ...draft, id },
    ])

    return id
  }

  function updateGame(id: string, draft: GameDraft): void {
    setGames((current) =>
      current.map((game) =>
        game.id === id
          ? { ...draft, id: game.id }
          : game
      )
    )
  }
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/games" replace />} />
        <Route path="games" element={<GamesPage games={games} />} />
        <Route
          path="games/new"
          element={<NewGamePage onCreate={createGame} />}
        />
        <Route
          path="games/:id"
          element={
            <GameDetailsPage games={games} onDelete={deleteGame} />
          }
        />
        <Route
          path="games/:id/edit"
          element={
            <EditGamePage games={games} onUpdate={updateGame} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}