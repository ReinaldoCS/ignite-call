import { Button, Heading, MultiStep, Text } from '@ignight-ui/react'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/ssr/Check'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const { status } = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = status === 'authenticated'

  const handleConnectCalendar = async () => {
    await signIn('google', { callbackUrl: '/register/connect-calendar' })
  }

  const handleNavigateToNextStep = async () => {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
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

            {isSignedIn ? (
              <Button size="sm" disabled type="button">
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button disabled={!isSignedIn} onClick={handleNavigateToNextStep}>
            Próximo passo <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
