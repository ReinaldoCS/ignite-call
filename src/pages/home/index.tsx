import { Heading, Text } from '@ignight-ui/react'
import Image from 'next/image'

import previewImage from '@/assets/app-preview.png'

import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Calendario simbolizando aplicação em funcionamento"
          height={442}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
