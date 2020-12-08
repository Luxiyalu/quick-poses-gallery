import Head from 'next/head'
import css from './gallery.less'

export default function Gallery() {
  return (
    <div className={css.container}>
      <Head>
        <title>Quick Poses Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css.main}>TODO: gallery</main>
    </div>
  )
}
