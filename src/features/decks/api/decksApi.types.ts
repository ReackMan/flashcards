export type DecksResponseType = {
  items: DeckType[]
  maxCardsCount: number
  pagination: Pagination
}

type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

type Author = {
  id: string
  name: string
}

export type DeckType = {
  author: Author
  cardsCount: number
  cover: null | string
  created: string
  id: string
  isBlocked?: boolean | null
  isDeleted?: boolean | null
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

// type FieldType = 'name' | 'card' | 'updated' | 'created'
// type DirectionType = 'asc' | 'desc'

export type GetDecksParamsType = {
  authorId?: string
  // orderBy?: `${FieldType}-${DirectionType}`
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export type SortType = Pick<GetDecksParamsType, 'orderBy'>

export type DeleteDeckResponseType = Omit<DeckType, 'author'>

export type DeleteDeckParamsType = Pick<DeckType, 'id'>

export type UpdateDeckParamsType = {
  body: FormData
  id: string
}
export type GetDeckParamsType = Pick<DeckType, 'id'>
export type GetDeckResponseType = Omit<DeckType, 'author'>
