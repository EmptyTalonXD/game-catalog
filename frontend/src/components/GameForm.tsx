import { useState } from 'react'
import type { FormEvent } from 'react'
import type { GameDraft } from '../types/game'

type GameFormProps = {
    initialValues: GameDraft
    onSave: (draft: GameDraft) => void
    onCancel: () => void
}

export function GameForm(props: GameFormProps) {
    const [draft, setDraft] = useState(() => ({
        ...props.initialValues,
        rating: props.initialValues.rating === null
            ? ''
            : String(props.initialValues.rating),
        achievementProgress: props.initialValues.achievementProgress === null
            ? ''
            : String(props.initialValues.achievementProgress),
    }))
    const [error, setError] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const title = draft.title.trim()
        const platform = draft.platform.trim()
        const genre = draft.genre.trim()

        if (title.length < 3 || title.length > 100) {
            setError('Название должно содержать от 3 до 100 символов.')
            return
        }

        if (!platform) {
            setError('Укажите платформу.')
            return
        }

        if (!genre) {
            setError('Укажите жанр.')
            return
        }

        const ratingText = draft.rating.trim()
        const rating = ratingText === '' ? null : Number(ratingText)

        if (
            rating !== null &&
            (!Number.isFinite(rating) || rating < 1 || rating > 10)
        ) {
            setError('Оценка должна быть от 1 до 10 либо не указана.')
            return
        }

        const progressText = draft.achievementProgress.trim()
        const achievementProgress =
            progressText === '' ? null : Number(progressText)

        if (
            achievementProgress !== null &&
            (
                !Number.isFinite(achievementProgress) ||
                achievementProgress < 0 ||
                achievementProgress > 100
            )
        ) {
            setError('Процент достижений должен быть от 0 до 100 либо не указан.')
            return
        }

        setError('')

        props.onSave({
            ...draft,
            title,
            platform,
            genre,
            description: draft.description.trim(),
            note: draft.note.trim(),
            rating,
            achievementProgress,
        })
    }
    return (
        <form
            className="game-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <p>
                <label htmlFor="game-title">Название *</label>
                <input
                    id="game-title"
                    value={draft.title}
                    required
                    onChange={(event) =>
                        setDraft({ ...draft, title: event.target.value })
                    }
                />
            </p>

            <p>
                <label htmlFor="game-description">Описание</label>
                <textarea
                    id="game-description"
                    value={draft.description}
                    onChange={(event) =>
                        setDraft({ ...draft, description: event.target.value })
                    }
                />
            </p>

            <p>
                <label htmlFor="game-platform">Платформа *</label>
                <input
                    id="game-platform"
                    value={draft.platform}
                    required
                    onChange={(event) =>
                        setDraft({ ...draft, platform: event.target.value })
                    }
                />
            </p>

            <p>
                <label htmlFor="game-genre">Жанр *</label>
                <input
                    id="game-genre"
                    value={draft.genre}
                    required
                    onChange={(event) =>
                        setDraft({ ...draft, genre: event.target.value })
                    }
                />
            </p>

            <p>
                <label htmlFor="game-status">Статус</label>
                <select
                    id="game-status"
                    value={draft.status}
                    onChange={(event) => {
                        const status = event.target.value

                        if (
                            status === 'planned' ||
                            status === 'playing' ||
                            status === 'completed' ||
                            status === 'paused' ||
                            status === 'dropped'
                        ) {
                            setDraft({ ...draft, status })
                        }
                    }}
                >
                    <option value="planned">В планах</option>
                    <option value="playing">Играю</option>
                    <option value="completed">Пройдена</option>
                    <option value="paused">Отложена</option>
                    <option value="dropped">Брошена</option>
                </select>
            </p>

            <p>
                <label htmlFor="game-rating">Оценка — от 1 до 10</label>
                <input
                    id="game-rating"
                    type="number"
                    min="1"
                    max="10"
                    step="any"
                    value={draft.rating}
                    onChange={(event) =>
                        setDraft({ ...draft, rating: event.target.value })
                    }
                />
            </p>

            <p>
                <label htmlFor="game-achievements">
                    Достижения — от 0 до 100%
                </label>
                <input
                    id="game-achievements"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={draft.achievementProgress}
                    onChange={(event) =>
                        setDraft({
                            ...draft,
                            achievementProgress: event.target.value,
                        })
                    }
                />
            </p>

            <p>
                <label htmlFor="game-note">Заметка</label>
                <textarea
                    id="game-note"
                    value={draft.note}
                    onChange={(event) =>
                        setDraft({ ...draft, note: event.target.value })
                    }
                />
            </p>

            <p>* Обязательные поля. Оценку и достижения можно не указывать.</p>
            {error && (
                <p className="form-error" role="alert">
                    {error}
                </p>
            )}

            <button type="submit">
                Сохранить
            </button>
            
            <button type="button" onClick={props.onCancel}>
                Отмена
            </button>
        </form>
    )
}