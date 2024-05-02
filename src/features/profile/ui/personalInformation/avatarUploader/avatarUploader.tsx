import { ReactElement } from 'react'

import { EditIcon } from '@/assets'
import { mutationNotificationHandler } from '@/common'
import { Avatar, IconButton, Uploader } from '@/components'
import { useUpdateProfileMutation } from '@/features'

import s from './avatarUploader.module.scss'

type Props = {
  avatar?: string
  className?: string
  editable?: boolean
  name: string
}

export const AvatarUploader = ({
  avatar,
  className,
  editable = true,
  name,
}: Props): ReactElement => {
  const [updateProfile] = useUpdateProfileMutation()

  const onLoadCover = async (data: File) => {
    const formData = new FormData()

    await formData.append('avatar', data)

    mutationNotificationHandler(updateProfile(formData), false, `Photo is successfully updated.`)
  }

  return (
    <div className={`${s.root} ${className}`}>
      <Avatar image={avatar} size={'large'} userName={name} />
      {editable && (
        <Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={() => {}}>
          <IconButton className={s.editAvatar} icon={<EditIcon />} />
        </Uploader>
      )}
    </div>
  )
}
