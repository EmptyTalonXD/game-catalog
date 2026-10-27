import { Link } from 'react-router'

export function NewGamePage() {
  return (
    <section>
      <h1>Добавление игры</h1>
      <p>
        Форма добавления игры появится в лабораторной работе №3.
      </p>
      <Link to="/games">К списку игр</Link>
    </section>
  )
}