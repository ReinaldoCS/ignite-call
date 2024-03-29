import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'

// http://localhost:3333/api/users/reinaldocs/shedule
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' })
  }

  const createSchedulingBodySchema = z.object({
    name: z
      .string()
      .min(3, { message: 'O nome precisa no mínimo 3 caracteres  ' }),
    email: z.string().email({ message: 'Digite um email válido' }),
    observations: z.string().nullable(),
    date: z.string().datetime(),
  })

  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    req.body,
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'Date is in the past.' })
  }

  const conflictingSchedule = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingSchedule) {
    return res
      .status(400)
      .json({ message: 'There is another scheduling at the same time.' })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      user_id: user.id,
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  console.log('email -> ', user.email)
  console.log('displayName -> ', user.name)

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendNotifications: true, // Envio de notificação via email
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [
        { email: user.email, displayName: user.name }, // Email do usuário
        { email, displayName: name }, // Participante
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return res.status(201).end()
}
