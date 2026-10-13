import './App.css'

const appTitle: string = 'Каталог игр'

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Личная коллекция игр, оценки и статусы прохождения.</p>
      </header>

      <section aria-labelledby="games-title">
        <h2 id="games-title">Мои игры</h2>
        <p>Здесь появится ваша коллекция игр.</p>
      </section>
    </main>
  )
}