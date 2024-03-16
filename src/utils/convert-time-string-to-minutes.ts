/**
 * @param timeString example 09:30
 * @return number of minutes
 */

export function convertTimeStringToMinutes(timeString: string): number {
  const [hour, minutes] = timeString.split(':').map((item) => Number(item))

  return hour * 60 + minutes
}
