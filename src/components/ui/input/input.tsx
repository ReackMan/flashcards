import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useState,
} from 'react'

import { ClosedEyeIcon, OpenEyeIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

import s from './input.module.scss'

export type InputProps = {
  error?: string
  label?: string
  leftIcon?: ReactNode
  onChangeValue?: (value: string) => void
  onEnter?: ComponentPropsWithoutRef<'input'>['onKeyDown']
  onLeftIconClickHandler?: () => void
  onRightIconClickHandler?: () => void
  rightIcon?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      label,
      leftIcon,
      onChange,
      onChangeValue,
      onEnter,
      onKeyDown,
      onLeftIconClickHandler,
      onRightIconClickHandler,
      rightIcon,
      type,
      ...restProps
    },
    ref
  ) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    const setVisiblePasswordHandler = () => {
      setIsVisiblePassword(prevState => !prevState)
    }

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeValue?.(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        onEnter?.(e)
      }
      onKeyDown?.(e)
    }

    const inputType = type === 'password' && isVisiblePassword ? 'text' : type
    const dynamicRightIcon = getRightInputIcon(type || 'text', isVisiblePassword, rightIcon)

    return (
      <div className={`${s.root} ${className}`}>
        {label && (
          <Typography
            as={'label'}
            className={`${s.label} ${restProps.disabled && s.disabledText}`}
            variant={TypographyVariant.Body2}
          >
            {label}
          </Typography>
        )}
        <div
          className={`${s.inputWrapper}
            ${!!restProps.value && s.active}
            ${restProps.disabled && s.disabled}
            ${!!error && s.error}`}
          tabIndex={0}
        >
          <input
            className={`${s.input} ${!!leftIcon && s.isLeftIcon} ${!!rightIcon && s.isRightIcon}`}
            onChange={onChangeValueHandler}
            onKeyDown={onKeyPressHandler}
            ref={ref}
            type={inputType}
            {...restProps}
          />
          <InputIcon className={s.leftIcon} icon={leftIcon} onClick={onLeftIconClickHandler} />
          <InputIcon
            className={s.rightIcon}
            icon={dynamicRightIcon}
            onClick={type === 'password' ? setVisiblePasswordHandler : onRightIconClickHandler}
          />
        </div>
        {!!error && (
          <Typography as={'span'} variant={TypographyVariant.ERROR}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

type IconProps = {
  className?: string
  icon?: ReactNode
  onClick?: () => void
}

const InputIcon = ({ className, icon, onClick }: IconProps) => {
  if (!icon) {
    return null
  }

  return (
    <button className={className} onClick={onClick} type={'button'}>
      {icon}
    </button>
  )
}

const getRightInputIcon = (type: string, isVisible: boolean, rightIcon: ReactNode) => {
  if (type === 'password' && isVisible) {
    return <OpenEyeIcon />
  } else if (type === 'password' && !isVisible) {
    return <ClosedEyeIcon />
  } else {
    return rightIcon
  }
}
