import { Button, TextInput } from '@ignight-ui/react'
import { ArrowRight } from '@phosphor-icons/react'

import { Form } from './styles'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput prefix="ignite.com/" placeholder="seu-usuario" />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
