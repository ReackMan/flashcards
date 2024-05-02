import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { NotFound } from '@/assets'
import { Route, TypographyVariant } from '@/common'
import { Button, Page, Typography } from '@/components'

import s from './notFoundPage.module.scss'

export const NotFoundPage = (): ReactElement => {
  return (
    <Page className={s.container}>
      <div className={s.image}>
        <NotFound />
      </div>
      <Typography className={s.text}>Sorry! Page not found!</Typography>
      <Button as={Link} to={Route.Main}>
        <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
          Back to home page
        </Typography>
      </Button>
    </Page>
  )
}
