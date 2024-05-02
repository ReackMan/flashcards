import { RootState } from '@/app'
import { baseApi, queryNotificationHandler, updateDecksQueryData } from '@/common'
import {
  DeckType,
  DecksResponseType,
  DeleteDeckParamsType,
  DeleteDeckResponseType,
  GetDeckParamsType,
  GetDeckResponseType,
  GetDecksParamsType,
  UpdateDeckParamsType,
} from '@/features'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<DeckType, FormData>({
      invalidatesTags: ['Decks'],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        const response = await queryFulfilled

        dispatch(
          decksApi.util.updateQueryData('getDecks', updateDecksQueryData(state), draft => {
            draft.items.unshift(response.data)
          })
        )
      },
      query: body => ({
        body,
        method: 'POST',
        url: 'decks',
      }),
    }),
    deleteDeck: builder.mutation<DeleteDeckResponseType, DeleteDeckParamsType>({
      async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        const patchResult = dispatch(
          decksApi.util.updateQueryData('getDecks', updateDecksQueryData(state), draft => {
            const index = draft?.items?.findIndex(deck => deck.id === id)

            if (index !== -1) {
              draft?.items?.splice(index, 1)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: ({ id }) => ({
        method: 'DELETE',
        url: `decks/${id}`,
      }),
    }),
    getDeck: builder.query<GetDeckResponseType, GetDeckParamsType>({
      providesTags: ['Decks', { id: 'List', type: 'Decks' }],
      query: ({ id }) => ({
        method: 'GET',
        url: `decks/${id}`,
      }),
      transformErrorResponse: response => {
        queryNotificationHandler(response)
      },
    }),
    getDecks: builder.query<DecksResponseType, GetDecksParamsType | void>({
      providesTags: ['Decks'],
      query: params => ({
        method: 'GET',
        params: params ?? {},
        url: 'decks',
      }),
      transformErrorResponse: response => queryNotificationHandler(response),
    }),
    updateDeck: builder.mutation<DeckType, UpdateDeckParamsType>({
      async onQueryStarted({ body, id }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        let cover = ''
        const patchResult = dispatch(
          decksApi.util.updateQueryData('getDecks', updateDecksQueryData(state), draft => {
            const index = draft.items.findIndex(deck => deck.id === id)

            const name = body.get('name')
            const isPrivate = body.get('isPrivate')
            const coverBlob = body.get('cover')

            if (coverBlob instanceof Blob) {
              cover = URL.createObjectURL(coverBlob)
            }

            if (index !== -1) {
              draft.items[index] = {
                ...draft.items[index],
                cover: cover,
                isPrivate: !!isPrivate,
                name: typeof name === 'string' ? name : '',
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        } finally {
          URL.revokeObjectURL(cover)
        }
      },
      query: ({ body, id }) => ({
        body,
        method: 'PATCH',
        url: `decks/${id}`,
      }),
    }),
  }),
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksApi
