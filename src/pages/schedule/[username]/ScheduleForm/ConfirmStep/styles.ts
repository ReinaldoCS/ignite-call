import { Box, styled, Text } from '@ignight-ui/react'

export const ConfirmFormContainer = styled(Box, {
  maxWidth: 540,
  width: '100%',
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const ConfirmFormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',
})

export const ConfirmFormText = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  svg: {
    color: '$gray200',
    width: '$5',
    height: '$5',
  },
})

export const ConfirmFormError = styled(Text, {
  color: '#F75A68',
})

export const ConfirmFormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',

  marginTop: '$2',
})
