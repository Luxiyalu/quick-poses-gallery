import css from './GalleryOptions.less'

export default function GalleryOptions({ handleOptionChange, setStarted, started }) {
    const intervalOptions = [
        { label: '30 sec', key: 30 },
        { label: '1 min', key: 60 },
        { label: '2 min', key: 120 },
        { label: '5 min', key: 300 },
    ]

    function handleChange(e) {
        const { name, value } = e.target
        if (handleOptionChange) handleOptionChange(name, value)
    }

    return (
        <section className={css.container}>
            {intervalOptions.map(({ label, key }, i) => {
                return (
                    <div key={i}>
                        <input
                            id={key}
                            value={key}
                            name="interval"
                            type="radio"
                            onChange={handleChange}
                        />
                        <label htmlFor={key}>{label}</label>
                    </div>
                )
            })}

            <button onClick={() => setStarted(true)}>Start</button>
        </section>
    )
}
