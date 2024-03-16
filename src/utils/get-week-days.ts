export function getWeekDays() {
  const diasSemana = []
  const dtf = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  for (let i = 0; i <= 6; i++) {
    const data = new Date(0, 0, i)
    const diaSemana = dtf.format(data)
    const diaSemanaFormatado =
      diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
    diasSemana.push(diaSemanaFormatado)
  }

  return diasSemana
}
