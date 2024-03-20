import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query
  // http://localhost:3333/api/users/reinaldocs/availability?date=2023/02/20

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ availability: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ availability: [] })
  }

  const {
    time_start_in_minutes: timeStartInMinutes,
    time_end_in_minutes: timeEndInMinutes,
  } = userAvailability

  const startHour = timeStartInMinutes / 60
  const endHour = timeEndInMinutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => startHour + i,
  )

  return res.json({ possibleTimes })
}
