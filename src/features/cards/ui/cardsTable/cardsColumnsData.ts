import { Column } from '@/components'

export const cardsColumnsData: Column[] = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    sortable: true,
    title: 'Answer',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'grade',
    sortable: true,
    title: 'Grade',
  },
  {
    key: 'icons',
    title: '',
  },
]

export const getCardsColumnsData = (isOwner: boolean) => {
  if (isOwner) {
    return cardsColumnsData
  }

  return cardsColumnsData.slice(0, cardsColumnsData.length - 1)
}
