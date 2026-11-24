import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header>
        <p className="app-title">Каталог игр</p>
        <p>Личная коллекция игр, оценки и статусы прохождения.</p>

        <p className="storage-notice">
          Учебный режим: изменения хранятся только до обновления страницы.
          После обновления восстанавливаются исходные пять игр.
        </p>

        <nav aria-label="Основная навигация">
          <NavLink to="/games" end>
            Мои игры
          </NavLink>

          <NavLink to="/games/new">
            Добавить игру
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}