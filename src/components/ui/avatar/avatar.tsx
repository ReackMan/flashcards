import { ComponentPropsWithoutRef } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

export type AvatarProps = {
  image?: string
  size?: 'large' | 'small'
  userName: string
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

export const Avatar = ({
  className,
  image,
  size = 'small',
  userName,
  ...restProps
}: AvatarProps) => {
  const fallbackTitle = userName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()

  return (
    <AvatarPrimitive.Root className={`${s.root} ${s[size]} ${className}`} {...restProps}>
      <AvatarPrimitive.Image alt={'avatar'} className={s.image} src={image} />
      <AvatarPrimitive.Fallback className={s.fallback}>
        <Typography variant={TypographyVariant.Body1}>{fallbackTitle}</Typography>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
