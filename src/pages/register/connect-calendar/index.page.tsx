import { Button, Heading, MultiStep, Text } from '@ignight-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { signIn, useSession } from 'next-auth/react'

import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const { data: session, status } = useSession()

  console.log(status)
  console.log(session)

  // const handleRegister = async (data: RegisterFormData) => {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text as="span">Google Calendar</Text>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button>
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
