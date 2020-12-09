import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useInterval } from '../../services'
import shuffle from 'lodash/shuffle'
import css from './Gallery.less'

export default function Gallery({
    files = [],
    showGallery,
    paused,
    setPaused,
    activeIndex,
    countdown,
    stopGallery,
    moveBy,
}) {
    const [shuffledFiles, setShuffledFiles] = useState([])

    useEffect(() => {
        setShuffledFiles(shuffle(files))
    }, [files])

    useEffect(() => {
        if (countdown <= 0) moveBy(1)
    }, [countdown])

    return (
        <section className={cn(css.gallery, { [css.showGallery]: showGallery })}>
            <h2 className={css.counter}>
                {activeIndex + 1}/{files.length}
                <br />
                <span>Countdown: {countdown}</span>
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
                <button onClick={() => stopGallery()}>Stop</button>
                <button onClick={() => moveBy(1)}>{'>'}</button>
            </div>
        </section>
    )
}
