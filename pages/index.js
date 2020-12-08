import Head from 'next/head'
import { useState } from 'react'
import { Dropzone, GalleryOptions, Gallery } from '../components'
import css from './index.less'

export default function Home() {
    const [started, setStarted] = useState()
    const [interval, setInterval] = useState()
    const [files, setFiles] = useState([])

    function handleOptionChange(option, value) {
        option === 'interval' && setInterval(value)
    }

    return (
        <div className={css.container}>
            <Head>
                <title>Quick Poses Gallery</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={css.main}>
                {started ? (
                    <Gallery files={files} />
                ) : (
                    <Dropzone files={files} setFiles={setFiles} />
                )}

                <GalleryOptions
                    handleOptionChange={handleOptionChange}
                    setStarted={setStarted}
                    started={started}
                />
            </main>
        </div>
    )
}
