import css from './GalleryOptions.module.css'

export default function GalleryOptions({ handleOptionChange, startGallery }) {
    const intervalOptions = [
        { label: '30 sec', key: 30 },
        { label: '1 min', key: 60 },
        { label: '5 min', key: 300 },
    ]

    function handleChange(e) {
        const { value } = e.target
        if (!handleOptionChange) return

        if (value.startsWith('class')) {
            handleOptionChange('class', value)
        } else {
            handleOptionChange('interval', value)
        }
    }

    return (
        <section className={css.container}>
            <h3>Class Mode:</h3>
            <label className={css.intervalsLabel}>
                <input
                    className={css.intervalInput}
                    id="classMode"
                    value="classMode"
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
            <button className={css.startButton} onClick={() => startGallery()}>
                Start
            </button>
        </section>
    )
}
