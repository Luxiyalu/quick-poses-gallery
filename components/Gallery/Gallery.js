import css from './Gallery.less'

export default function Gallery({ files }) {
    return (
        <section className={css.container}>
            {files.map((file) => (
                <div className={css.thumb} key={file.name}>
                    <div className={css.thumbInner}>
                        <img src={file.preview} className={css.img} />
                    </div>
                </div>
            ))}
        </section>
    )
}
