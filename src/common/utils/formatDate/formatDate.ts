export const formatDate = (dateString: string): string => {
  const inputDate = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    month: '2-digit',
    second: 'numeric',
    year: 'numeric',
  }

  const formatter = new Intl.DateTimeFormat('ru', options)

  return formatter.format(inputDate)
}
