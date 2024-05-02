import { ReactElement, useState } from 'react'

import { TypographyVariant } from '@/common'
import { Card, Typography } from '@/components'
import { AvatarUploader, EditProfile, EditProfileValues, ProfileInfo } from '@/features'

import s from './personalInformation.module.scss'

export type ProfileDataType = {
  avatar?: string
  email: string
  name: string
}

type Props = {
  data: ProfileDataType
  update: (data: EditProfileValues) => void
}

export const PersonalInformation = ({ data, update }: Props): ReactElement => {
  const { avatar, email, name } = data
  const [editMode, setEditMode] = useState(false)

  const onEditProfile = () => {
    setEditMode(true)
  }

  const onSubmit = (data: EditProfileValues) => {
    update(data)
    setEditMode(false)
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={TypographyVariant.H1}>
        Personal Information
      </Typography>
      <AvatarUploader
        avatar={avatar}
        className={s.avatarUploader}
        editable={!editMode}
        name={name}
      />
      {editMode ? (
        <EditProfile initialValues={{ name }} onSubmit={onSubmit} />
      ) : (
        <ProfileInfo email={email} name={name} onEditProfile={onEditProfile} />
      )}
    </Card>
  )
}
