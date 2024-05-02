import { RootState } from '@/app'
import {
  baseApi,
  getFileFromFormData,
  getTextFromFormData,
  queryNotificationHandler,
  updateCardsQueryData,
} from '@/common'
import {
  Card,
  CardRateRequest,
  CardResponse,
  CardValues,
  CardsParams,
  CardsResponseType,
  GetDeckResponseType,
  RandomCardRequest,
} from '@/features'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<Card, { body: FormData; id: string }>({
      invalidatesTags: ['Cards', 'Decks', { id: 'List', type: 'Decks' }],
      query: ({ body, id }) => ({
        body,
        method: 'POST',
        url: `decks/${id}/cards`,
      }),
    }),
    deleteCard: builder.mutation<void, { cardId: string; deckId: string }>({
      invalidatesTags: ['Decks', { id: 'List', type: 'Decks' }],
      async onQueryStarted({ cardId, deckId }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState
        const deleteResult = dispatch(
          cardsApi.util.updateQueryData(
            'getCards',
            {
              id: deckId,
              params: updateCardsQueryData(state),
            },
            draft => {
              const index = draft.items.findIndex(card => card.id === cardId)

              if (index !== -1) {
                draft.items = draft.items.filter((_, cardIndex) => cardIndex !== index)
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          deleteResult.undo()
        }
      },
      query: ({ cardId }) => ({
        method: 'DELETE',
        url: `cards/${cardId}`,
      }),
      transformErrorResponse: response => {
        queryNotificationHandler(response)
      },
    }),
    getCards: builder.query<CardsResponseType, { id: string; params: CardsParams }>({
      providesTags: ['Cards'],
      query: ({ id, params }) => ({
        method: 'GET',
        params: params,
        url: `decks/${id}/cards`,
      }),
      transformErrorResponse: response => {
        queryNotificationHandler(response)
      },
    }),
    getRandomCard: builder.query<{ name?: string } & CardResponse, RandomCardRequest>({
      queryFn: async (arg, _api, _extraOptions, fetchWithBQ) => {
        const deckResponse = await fetchWithBQ(`decks/${arg.id}`)

        if (deckResponse.error) {
          queryNotificationHandler(deckResponse.error)

          return { error: deckResponse.error as FetchBaseQueryError }
        }

        const cardsResponse = await fetchWithBQ({
          method: 'GET',
          params: { previousCardId: arg.previousCardId },
          url: `decks/${arg.id}/learn`,
        })

        if (cardsResponse.error) {
          queryNotificationHandler(cardsResponse.error)

          return { error: cardsResponse.error as FetchBaseQueryError }
        }
        const deckData = deckResponse.data as GetDeckResponseType
        const cardData = cardsResponse.data as CardResponse

        return { data: { ...cardData, name: deckData.name } }
      },
    }),
    rateCard: builder.mutation<CardResponse, CardRateRequest>({
      invalidatesTags: ['Cards'],
      async onQueryStarted({ deckId }, { dispatch, queryFulfilled }) {
        const { data: newCard } = await queryFulfilled

        dispatch(
          cardsApi.util.updateQueryData('getRandomCard', { id: deckId }, () => {
            return newCard
          })
        )
      },
      query: ({ deckId, ...rest }) => ({
        body: rest,
        method: 'POST',
        url: `decks/${deckId}/learns`,
      }),
    }),

    updateCard: builder.mutation<Card, { body: FormData; cardId: string; deckId: string }>({
      async onQueryStarted({ body, cardId, deckId }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState
        let questionImageUrl = ''
        let answerImageUrl = ''
        const patchResult = dispatch(
          cardsApi.util.updateQueryData(
            'getCards',
            {
              id: deckId,
              params: updateCardsQueryData(state),
            },
            draft => {
              const index = draft.items.findIndex(card => card.id === cardId)

              if (index !== -1) {
                const question = getTextFromFormData(body.get('question'))
                const answer = getTextFromFormData(body.get('answer'))
                const questionImg = getFileFromFormData(body.get('questionImg'))
                const answerImg = getFileFromFormData(body.get('answerImg'))

                const updatedCard: Partial<CardValues> = {
                  answer,
                  question,
                }

                if (questionImg) {
                  questionImageUrl = URL.createObjectURL(questionImg)
                  updatedCard.questionImg = questionImageUrl
                }
                if (answerImg) {
                  answerImageUrl = URL.createObjectURL(answerImg)
                  updatedCard.answerImg = answerImageUrl
                }

                draft.items[index] = { ...draft.items[index], ...updatedCard }
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        } finally {
          URL.revokeObjectURL(questionImageUrl)
          URL.revokeObjectURL(answerImageUrl)
        }
      },
      query: ({ body, cardId }) => ({
        body,
        method: 'PATCH',
        url: `cards/${cardId}`,
      }),
      transformErrorResponse: response => {
        queryNotificationHandler(response)
      },
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetRandomCardQuery,
  useRateCardMutation,
  useUpdateCardMutation,
} = cardsApi
