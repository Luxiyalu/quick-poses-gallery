import Head from 'next/head'
import { Dropzone } from '../components'
import css from './index.less'

export default function Home() {
    return (
        <div className={css.container}>
            <Head>
                <title>Quick Poses Gallery</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={css.main}>
                <Dropzone />
                <GalleryOptions />
            </main>
        </div>
    )
}
