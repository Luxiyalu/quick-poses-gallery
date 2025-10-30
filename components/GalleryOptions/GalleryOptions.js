import css from './GalleryOptions.module.css'
import { OPTIONS } from '../../services'

export default function GalleryOptions({ handleOptionChange, startGallery, selectedOption }) {
    const intervalOptions = [
        { label: '10 sec', key: 10 },
        { label: '30 sec', key: 30 },
        { label: '1 min', key: 60 },
        { label: '2 min', key: 120 },
        { label: '5 min', key: 300 },
    ]

    function handleChange(e) {
        const { value } = e.target
        if (!handleOptionChange) return

        if (value === OPTIONS.CLASS_MODE) {
            handleOptionChange(OPTIONS.CLASS_MODE, value)
        } else {
            handleOptionChange(OPTIONS.INTERVAL_MODE, value)
        }
    }

    return (
        <section className={css.container}>
            <h3>Class Mode:</h3>
            <label className={css.intervalsLabel}>
                <input
                    className={css.intervalInput}
                    id={OPTIONS.CLASS_MODE}
                    value={OPTIONS.CLASS_MODE}
                    name="singleOption"
                    type="radio"
                    onChange={handleChange}
                />
                15 min session (30 sec x 10, 1 min x 5, 5 min x 1)
            </label>
            <h3>Fixed Interval:</h3>
            <div className={css.intervals}>
                {intervalOptions.map(({ label, key }, i) => {
                    return (
                        <label className={css.intervalsLabel} htmlFor={key} key={i}>
                            <input
                                className={css.intervalInput}
                                id={key}
                                value={key}
                                name="singleOption"
                                type="radio"
                                onChange={handleChange}
                            />
                            {label}
                        </label>
                    )
                })}
            </div>
            <button
                className={css.startButton}
                onClick={() => startGallery()}
                disabled={!selectedOption}
            >
                Start
            </button>
        </section>
    )
}
