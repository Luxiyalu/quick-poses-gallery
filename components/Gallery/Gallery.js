import { useState } from 'react'
import shuffle from 'lodash/shuffle'
import css from './Gallery.less'

export default function Gallery({ files }) {
    const shuffledFiles = shuffle(files)
    const [activeFileIndex, setActiveFileIndex] = useState(0)

    return (
        <section className={css.container}>
            <img src={shuffledFiles[activeFileIndex].preview} />
        </section>
    )
}
