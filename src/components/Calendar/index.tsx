import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { getWeekDays } from '@/utils/get-week-days'

import {
  ButtonAction,
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')
    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    return [...previousMonthFillArray, ...daysInMonthArray]
  }, [currentDate])

  console.log(calendarWeeks)

  const shortWeekDays = getWeekDays({ short: true })

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <ButtonAction onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </ButtonAction>
          <ButtonAction onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </ButtonAction>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekday) => (
              <th key={weekday}>{weekday}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled>4</CalendarDay>
            </td>
            <td>
              <CalendarDay>5</CalendarDay>
            </td>
            <td>
              <CalendarDay>6</CalendarDay>
            </td>
            <td>
              <CalendarDay>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>9</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>10</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
