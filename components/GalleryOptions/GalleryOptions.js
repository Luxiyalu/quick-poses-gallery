import css from './GalleryOptions.less'

export default function GalleryOptions({ handleOptionChange, startGallery }) {
    const intervalOptions = [
        { label: '30 sec', key: 30 },
        { label: '1 min', key: 60 },
        { label: '5 min', key: 300 },
        { label: '10 min', key: 600 },
    ]

    function handleChange(e) {
        const { name, value } = e.target
        if (handleOptionChange) handleOptionChange(name, value)
    }

    return (
        <section className={css.container}>
            <h3>Interval:</h3>
            <div className={css.intervals}>
                {intervalOptions.map(({ label, key }, i) => {
                    return (
                        <label htmlFor={key} key={i}>
                            <input
                                id={key}
                                value={key}
                                name="interval"
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
