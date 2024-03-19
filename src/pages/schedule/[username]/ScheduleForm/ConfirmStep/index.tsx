import { Button, Text, TextArea, TextInput } from '@ignight-ui/react'
import { CalendarBlank, Clock } from '@phosphor-icons/react'

import {
  ConfirmFormActions,
  ConfirmFormContainer,
  ConfirmFormHeader,
  ConfirmFormText,
} from './styles'

export function ConfirmStep() {
  return (
    <ConfirmFormContainer as="form">
      <ConfirmFormHeader>
        <ConfirmFormText>
          <CalendarBlank /> 22 de Setembro de 2022
        </ConfirmFormText>
        <ConfirmFormText>
          <Clock />
          18:00h
        </ConfirmFormText>
      </ConfirmFormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput type="text" placeholder="Seu nome" />
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <ConfirmFormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </ConfirmFormActions>
    </ConfirmFormContainer>
  )
}
