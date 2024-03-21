import '../lib/dayjs'

import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'

import { queryClient } from '@/lib/react-query'
import { globalStyles } from '@/styles/global'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={`${roboto.className}`}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'pt-BR',
              siteName: 'Ignite Call',
            }}
          />
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </main>
  )
}
