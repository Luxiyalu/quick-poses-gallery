import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useInterval } from '../../services'
import shuffle from 'lodash/shuffle'
import css from './Gallery.less'

export default function Gallery({ files = [], interval = 1, setStarted, started }) {
    const [shuffledFiles, setShuffledFiles] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const stopGallery = () => {
        setPaused(false)
        setStarted(false)
        setActiveIndex(0)
    }
    const moveBy = (delta) => {
        const newIndex = activeIndex + delta

        if (newIndex < 0 || newIndex >= files.length) {
            stopGallery()
        } else {
            setActiveIndex(newIndex)
        }
    }

    useEffect(() => {
        setShuffledFiles(shuffle(files))
    }, [files])

    useInterval(function tick() {
        if (paused || !started || !files.length) return

        if (activeIndex < files.length - 1) {
            setActiveIndex(activeIndex + 1)
        } else {
            stopGallery()
        }
    }, interval * 1000) // TODO: use this function as second ticking by, so that pause work properly, not skipping rounds

    return (
        <section className={cn(css.gallery, { [css.started]: started })}>
            <h2 className={css.counter}>
                {activeIndex + 1}/{files.length}
            </h2>

            {shuffledFiles.map((file, i) => (
                <div
                    key={i}
                    className={cn(css.imageContainer, { [css.active]: i === activeIndex })}
                >
                    <img src={file.preview} />
                </div>
            ))}

            <div className={css.controls}>
                <button onClick={() => moveBy(-1)}>{'<'}</button>
                <button onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>
                <button onClick={() => setStarted(false)}>Stop</button>
                <button onClick={() => moveBy(1)}>{'>'}</button>
            </div>
        </section>
    )
}
