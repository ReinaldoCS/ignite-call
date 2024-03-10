import { Button, Heading, MultiStep, Text, TextInput } from '@ignight-ui/react'
import { ArrowRight } from '@phosphor-icons/react'

import { Container, Form, Header } from './styles'

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
      </Header>

      <MultiStep size={4} currentStep={1} />

      <Form as="form">
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuario" />
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" />
        </label>

        <Button>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
