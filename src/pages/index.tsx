import { Heading, Text } from '@ignight-ui/react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default function Home() {
  return (
    <main className={`${roboto.className}`}>
      <Heading>Hello world</Heading>
      <Text>Testing</Text>
    </main>
  )
}
