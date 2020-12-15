import Head from 'next/head'
import shuffle from 'lodash/shuffle'
import { useInterval } from '../services'
import { useCallback, useState, useEffect } from 'react'
import { Dropzone, GalleryOptions, Gallery } from '../components'
import css from './index.less'

export default function Home() {
    const [files, setFiles] = useState([])
    const [shuffledFiles, setShuffledFiles] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [showGallery, setShowGallery] = useState(false)
    const [paused, setPaused] = useState(false)
    const [interval, setInterval] = useState(1)
    const [countdown, setCountdown] = useState(interval)

    const handleOptionChange = (option, value) => {
        option === 'interval' && setInterval(value)
    }
    const startGallery = () => {
        if (!files.length) return

        setShuffledFiles(shuffle(files))
        setCountdown(interval)
        setActiveIndex(0)
        setPaused(false)
        setShowGallery(true)
    }
    const stopGallery = () => {
        setPaused(true)
        setShowGallery(false)
    }
    const moveBy = useCallback(
        (delta) => {
            const newIndex = activeIndex + delta
            const endOfDeck = newIndex < 0 || newIndex >= files.length

            if (endOfDeck) {
                stopGallery()
            } else {
                setActiveIndex(newIndex)
            }
            setCountdown(interval)
        },
        [files, activeIndex, interval],
    )
    const handleKeyDown = (e) => {
        console.log(e)
        if (e.code === 'Space') setPaused((p) => !p)
        if (e.code === 'ArrowRight') moveBy(1)
        if (e.code === 'ArrowLeft') moveBy(-1)
        if (e.code === 'KeyQ') stopGallery()
    }

    useInterval(function tick() {
        if (paused || !showGallery || !files.length) return
        setCountdown(countdown - 1)
    }, 1000)

    useEffect(() => {
        if (countdown <= 0) moveBy(1)
    }, [countdown])

    return (
        <div tabIndex={0} onKeyDown={handleKeyDown} className={css.container}>
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
                    files={shuffledFiles}
                    interval={interval}
                    paused={paused}
                    setPaused={setPaused}
                    showGallery={showGallery}
                    activeIndex={activeIndex}
                    interval={interval}
                    countdown={countdown}
                    stopGallery={stopGallery}
                    moveBy={moveBy}
                />
            </main>
        </div>
    )
}
