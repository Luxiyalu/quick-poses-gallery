import Head from 'next/head'
import '../styles/globals.less'

function MyApp({ Component, pageProps }) {
    const script = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date()); gtag('config', 'G-3R3EJQXDW2');`

    return (
        <>
            <Head>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-3R3EJQXDW2"
                ></script>
                <script dangerouslySetInnerHTML={{ __html: script }} />
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default MyApp
