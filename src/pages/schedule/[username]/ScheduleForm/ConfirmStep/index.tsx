import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignight-ui/react'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  ConfirmFormActions,
  ConfirmFormContainer,
  ConfirmFormError,
  ConfirmFormHeader,
  ConfirmFormText,
} from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa no mínimo 3 caracteres  ' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  const handleConfirmScheduling = (data: ConfirmFormData) => {
    console.log(data)
  }

  return (
    <ConfirmFormContainer
      as="form"
      onSubmit={handleSubmit(handleConfirmScheduling)}
    >
      <ConfirmFormHeader>
        <ConfirmFormText>
          <CalendarBlank />
          {describedDate}
        </ConfirmFormText>
        <ConfirmFormText>
          <Clock />
          {describedTime}
        </ConfirmFormText>
      </ConfirmFormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput type="text" placeholder="Seu nome" {...register('name')} />
        {errors.name && (
          <ConfirmFormError size="sm">{errors.name.message}</ConfirmFormError>
        )}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <ConfirmFormError size="sm">{errors.email.message}</ConfirmFormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <ConfirmFormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmFormActions>
    </ConfirmFormContainer>
  )
}
