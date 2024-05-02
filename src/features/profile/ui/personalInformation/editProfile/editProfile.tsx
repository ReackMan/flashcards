import { ReactElement } from 'react'

import { Button, ControlledInput } from '@/components'
import { EditProfileValues, useEditProfile } from '@/features'

import s from './editProfile.module.scss'

type Props = {
  initialValues?: EditProfileValues
  onSubmit: (data: EditProfileValues) => void
}

export const EditProfile = ({ initialValues, onSubmit }: Props): ReactElement => {
  const { control, handleSubmit } = useEditProfile(initialValues)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput className={s.input} control={control} label={'Nickname'} name={'name'} />
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
