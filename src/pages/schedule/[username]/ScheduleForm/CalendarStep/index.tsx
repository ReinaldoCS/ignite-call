import { useState } from 'react'

import { Calendar } from '@/components/Calendar'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelect={setSelectDate} selectedDate={selectedDate} />
      {isDateSelected && (
        <div>
          <TimePicker>
            <TimePickerHeader>
              terça-feira, <span>20 de setembro</span>
            </TimePickerHeader>

            <TimePickerList>
              <TimePickerItem>08:00h</TimePickerItem>
              <TimePickerItem disabled>09:00h</TimePickerItem>
              <TimePickerItem>10:00h</TimePickerItem>
              <TimePickerItem>11:00h</TimePickerItem>
              <TimePickerItem>12:00h</TimePickerItem>
              <TimePickerItem>13:00h</TimePickerItem>
              <TimePickerItem>14:00h</TimePickerItem>
              <TimePickerItem>15:00h</TimePickerItem>
              <TimePickerItem>16:00h</TimePickerItem>
              <TimePickerItem>17:00h</TimePickerItem>
              <TimePickerItem>18:00h</TimePickerItem>
              <TimePickerItem>19:00h</TimePickerItem>
              <TimePickerItem>20:00h</TimePickerItem>
              <TimePickerItem>21:00h</TimePickerItem>
            </TimePickerList>
          </TimePicker>
        </div>
      )}
    </Container>
  )
}
