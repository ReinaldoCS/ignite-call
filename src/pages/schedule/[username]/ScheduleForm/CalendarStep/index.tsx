import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface IAvailability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectDate] = useState<Date | null>(null)
  const router = useRouter()
  const username = String(router.query.username)

  const [availability, setAvailability] = useState<IAvailability | null>(null)
  useEffect(() => {
    if (!selectedDate) {
      return
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        setAvailability(response.data)
      })
  }, [selectedDate, username])

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelect={setSelectDate} selectedDate={selectedDate} />
      {isDateSelected && (
        <div>
          <TimePicker>
            <TimePickerHeader>
              {weekDay}, <span>{describedDate}</span>
            </TimePickerHeader>

            <TimePickerList>
              {availability?.possibleTimes.map((hour) => (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              ))}
            </TimePickerList>
          </TimePicker>
        </div>
      )}
    </Container>
  )
}
