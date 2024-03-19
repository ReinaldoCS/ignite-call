import { Avatar, Heading, Text } from '@ignight-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { prisma } from '@/lib/prisma'

import { CalendarStep } from './ScheduleForm/CalendarStep'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>

        <CalendarStep />
      </UserHeader>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avataUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // Recria página 1 vez por dia
  }
}
