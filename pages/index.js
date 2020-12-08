import Head from 'next/head'
import { useState } from 'react'
import { Dropzone, GalleryOptions } from '../components'
import css from './index.less'

export default function Home() {
    const [interval, setInterval] = useState()

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
                <Dropzone />
                <GalleryOptions handleOptionChange={handleOptionChange} />
            </main>
        </div>
    )
}
