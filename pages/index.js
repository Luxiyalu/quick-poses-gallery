import Head from 'next/head'
import { useState } from 'react'
import { useInterval } from '../services'
import { Dropzone, GalleryOptions, Gallery } from '../components'
import css from './index.less'

export default function Home() {
    const [files, setFiles] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [showGallery, setShowGallery] = useState(false)
    const [paused, setPaused] = useState(false)
    const [interval, setInterval] = useState(1)
    const [countdown, setCountdown] = useState(interval)

    const handleOptionChange = (option, value) => {
        option === 'interval' && setInterval(value)
    }
    const startGallery = () => {
        setCountdown(interval)
        setActiveIndex(0)
        setShowGallery(true)
        setPaused(false)
    }
    const stopGallery = () => {
        setShowGallery(false)
        setPaused(true)
    }
    const moveBy = (delta) => {
        const newIndex = activeIndex + delta
        const endOfDeck = newIndex < 0 || newIndex >= files.length

        if (endOfDeck) {
            stopGallery()
        } else {
            setActiveIndex(newIndex)
        }
        setCountdown(interval)
    }

    useInterval(function tick() {
        if (paused || !showGallery || !files.length) return
        setCountdown(countdown - 1)
    }, 1000)

    return (
        <div className={css.container}>
            <Head>
                <title>Quick Poses Gallery</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={css.main}>
                <h1>Quick Poses Gallery</h1>

                <Dropzone files={files} setFiles={setFiles} />

                <GalleryOptions
                    startGallery={startGallery}
                    handleOptionChange={handleOptionChange}
                />

                <Gallery
                    files={files}
                    interval={interval}
                    paused={paused}
                    setPaused={setPaused}
                    showGallery={showGallery}
                    setShowGallery={setShowGallery}
                    startGallery={startGallery}
                    stopGallery={stopGallery}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                    countdown={countdown}
                    moveBy={moveBy}
                />
            </main>
        </div>
    )
}
