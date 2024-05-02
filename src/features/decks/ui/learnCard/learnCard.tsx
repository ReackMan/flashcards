import { ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TypographyVariant, mutationNotificationHandler } from '@/common'
import { Button, Card, Typography } from '@/components'
import { useGetRandomCardQuery, useRateCardMutation } from '@/features'

import s from './learnCard.module.scss'

import { RateLearnCard, RateLearnCardValues } from './rateLearnCard'

export const LearnCard = (): ReactElement => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const [rateCard] = useRateCardMutation()

  const params = useParams()
  const id = params.id as string
  /*  const { data: deck } = useGetDeckQuery({ id })*/
  const { data: card } = useGetRandomCardQuery({ id })

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const onSubmit = (data: RateLearnCardValues) => {
    mutationNotificationHandler(
      rateCard({ cardId: card!.id, deckId: id, grade: Number(data.grade) }),
      false
    ).then(data => {
      if (data?.status === 'success') {
        setIsShowAnswer(false)
      }
    })
  }

  return (
    <Card className={s.root}>
      <Typography as={'h2'} className={s.title} variant={TypographyVariant.H1}>
        Learn {card?.name}
      </Typography>
      <Typography className={s.question}>
        <b>Question:</b> {card?.question}
      </Typography>
      {card?.questionImg && (
        <div className={s.imgWrapper}>
          <img alt={'question'} src={card.questionImg} />
        </div>
      )}
      <Typography className={s.shots} variant={TypographyVariant.Body2}>
        Number of attempts: <b>{card?.shots}</b>
      </Typography>

      {isShowAnswer ? (
        <>
          <Typography className={s.answer}>
            <b>Answer:</b> {card?.answer}
          </Typography>
          {card?.answerImg && (
            <div className={s.imgWrapper}>
              <img alt={'answer'} src={card.answerImg} />
            </div>
          )}
          <Typography className={s.rate} variant={TypographyVariant.Subtitle1}>
            Rate yourself:
          </Typography>
          <RateLearnCard onSubmit={onSubmit} />
        </>
      ) : (
        <Button fullWidth onClick={onShowAnswer}>
          Show Answer
        </Button>
      )}
    </Card>
  )
}
