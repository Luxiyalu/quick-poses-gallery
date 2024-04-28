import cn from 'classnames'
import css from './Gallery.module.css'
import { useState, useEffect } from 'react'

export default function Gallery({
    files,
    interval,
    showGallery,
    paused,
    setPaused,
    activeIndex,
    option,
    classMode,
    classProgression,
    countdown,
    stopGallery,
    moveBy,
}) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (option !== 'class') {
            return
        }

        const totalSeconds = classMode.reduce((sum, a) => sum + a, 0)
        const progressSeconds =
            classMode.slice(0, classProgression).reduce((sum, a) => sum + a, 0) +
            (interval - countdown)
        const progressPercent = (progressSeconds / totalSeconds) * 100

        setProgress(progressPercent)
    }, [interval, countdown, classMode, classProgression])

    return (
        <section className={cn(css.gallery, { [css.showGallery]: showGallery })}>
            <h2 className={css.counter}>
                {option === 'class' && (
                    <span>
                        Class: {classProgression + 1}/{classMode.length}
                    </span>
                )}
                <span className={css.totalCounter}>
                    Total: {activeIndex + 1}/{files.length}
                </span>
            </h2>
            <p className={css.countdown}>
                {new Date(countdown * 1000).toISOString().slice(countdown > 3600 ? 11 : 14, 19)}
            </p>

            {files.map((file, i) => (
                <div
                    key={i}
                    className={cn(css.imageContainer, { [css.active]: i === activeIndex })}
                >
                    <img className={css.imageInContainer} src={file.preview} />
                </div>
            ))}

            <div className={css.controls}>
                <button onClick={() => moveBy(-1)} title="Left">
                    {'<'}
                </button>
                <button onClick={() => setPaused(!paused)} title="Space">
                    {paused ? 'Play' : 'Pause'}
                </button>
                <button onClick={() => stopGallery()} title="Q">
                    Stop
                </button>
                <button onClick={() => moveBy(1)} title="Right">
                    {'>'}
                </button>
            </div>

            {option === 'class' && (
                <div className={css.progressContainer}>
                    <div className={css.progress} style={{ width: `${progress}%` }} />
                </div>
            )}
        </section>
    )
}
