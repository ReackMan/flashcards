import { ComponentPropsWithoutRef } from 'react'

import { TypographyVariant } from '@/common'
import { Avatar, Typography } from '@/components'

import s from './headerProfileInfo.module.scss'

type HeaderProfileInfoProps = {
  avatar?: string
  className?: string
  email?: string
  name?: string
} & ComponentPropsWithoutRef<'div'>

export const HeaderProfileInfo = ({
  avatar = 'avatar',
  className,
  email = 'email',
  name = 'name',
}: HeaderProfileInfoProps) => {
  return (
    <div className={`${s.root} ${className}`}>
      <Avatar image={avatar} size={'small'} userName={name} />
      <div className={s.textWrapper}>
        <Typography variant={TypographyVariant.Subtitle1}>{name}</Typography>
        <Typography className={s.text} variant={TypographyVariant.Caption}>
          {email}
        </Typography>
      </div>
    </div>
  )
}
