import { ElementRef, ReactElement, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets'
import { ButtonVariant, Route } from '@/common'
import { Button } from '@/components'

import s from './goBack.module.scss'

type Props = {
  className?: string
  title: string
  to?: Route
}

export const GoBack = forwardRef<ElementRef<typeof Button>, Props>(
  ({ className, title, to }, ref): ReactElement => {
    const navigate = useNavigate()

    const onBack = () => {
      to ? navigate(to) : navigate(-1)
    }

    return (
      <Button
        className={`${s.root} ${className}`}
        onClick={onBack}
        // @ts-expect-error TS2322
        ref={ref}
        variant={ButtonVariant.Link}
      >
        <ArrowBackIcon size={1.6} />
        {title}
      </Button>
    )
  }
)
