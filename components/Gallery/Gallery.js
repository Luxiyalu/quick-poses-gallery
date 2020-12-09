import cn from 'classnames'
import { useEffect, useState } from 'react'
import shuffle from 'lodash/shuffle'
import css from './Gallery.less'

export default function Gallery({ files = [], interval = 1, setStarted, started }) {
    const [shuffledFiles, setShuffledFiles] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [intervalId, setIntervalId] = useState()

    useEffect(() => {
        setShuffledFiles(shuffle(files))
    }, [files])

    useEffect(() => {
        if (!started || !files.length) return
        if (intervalId) clearInterval(intervalId)

        const id = setInterval(() => {
            let stop = false

            setActiveIndex((activeIndex) => {
                if (activeIndex < files.length - 1) {
                    return activeIndex + 1
                } else {
                    stop = true
                    return 0
                }
            })

            if (stop) {
                setStarted(false)
                clearInterval(id)
            }
        }, interval * 1000)

        setIntervalId(id)
        return () => clearInterval(id)
    }, [started])

    return (
        <section className={cn(css.gallery, { [css.started]: started })}>
            <h2 className={css.counter}>
                {activeIndex + 1}/{files.length}
            </h2>

            {shuffledFiles.map((file, i) => (
                <div
                    className={cn(css.imageContainer, { [css.active]: i === activeIndex })}
                    key={i}
                >
                    <img src={file.preview} />
                </div>
            ))}
        </section>
    )
}
