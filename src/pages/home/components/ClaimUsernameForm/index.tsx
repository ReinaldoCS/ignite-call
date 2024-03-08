import { Button, TextInput } from '@ignight-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from './styles'

const ClaimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>({})

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
