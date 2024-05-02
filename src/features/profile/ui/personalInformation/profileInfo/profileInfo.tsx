import { ReactElement } from 'react'

import { EditIcon, LogoutIcon } from '@/assets'
import { ButtonVariant, TypographyVariant } from '@/common'
import { Button, IconButton, Typography } from '@/components'
import { useLogoutMutation } from '@/features'

import s from './profileInfo.module.scss'

type Props = {
  email: string
  name: string
  onEditProfile: () => void
}

export const ProfileInfo = ({ email, name, onEditProfile }: Props): ReactElement => {
  const [logout] = useLogoutMutation()

  const onLogout = () => {
    logout()
  }

  return (
    <div className={s.root}>
      <div className={s.userNameWrapper}>
        <Typography as={'h3'} className={s.user} variant={TypographyVariant.H1}>
          {name}
        </Typography>
        <IconButton icon={<EditIcon />} onClick={onEditProfile} size={1.6} />
      </div>
      <Typography className={s.email} variant={TypographyVariant.Body2}>
        {email}
      </Typography>
      <Button as={'a'} className={s.button} onClick={onLogout} variant={ButtonVariant.Secondary}>
        <LogoutIcon size={1.6} />
        Logout
      </Button>
    </div>
  )
}
