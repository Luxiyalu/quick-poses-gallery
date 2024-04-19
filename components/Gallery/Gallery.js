import cn from 'classnames'
import css from './Gallery.module.css'

export default function Gallery({
    files,
    showGallery,
    paused,
    setPaused,
    activeIndex,
    countdown,
    stopGallery,
    moveBy,
}) {
    return (
        <section className={cn(css.gallery, { [css.showGallery]: showGallery })}>
            <h2 className={css.counter}>
                {activeIndex + 1}/{files.length}
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

            {/* <div className={css.progressContainer}>
                <div
                    className={css.progress}
                    style={{ width: `${Math.round(100 - (countdown / interval) * 100)}%` }}
                />
            </div> */}
        </section>
    )
}
