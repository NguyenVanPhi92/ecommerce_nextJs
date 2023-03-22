import store from '@/store'
import '@/styles/globals.scss'
import '@/styles/base.scss'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <Head>
                <title>E-commerce</title>
                <meta name='description' content='E-commerce' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistStore(store)}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </SessionProvider>
        </>
    )
}
