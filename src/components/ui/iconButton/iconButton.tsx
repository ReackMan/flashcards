import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react'

import s from './iconButton.module.scss'

type IconButtonProps = {
  icon: ReactNode
  size?: number
} & ComponentPropsWithoutRef<'button'>

export const IconButton = ({ className, icon, size: sizeProp, ...restProps }: IconButtonProps) => {
  const size = sizeProp ? `${sizeProp}rem` : '2.4rem'

  const IconButtonStyle: CSSProperties = {
    height: size,
    width: size,
  }

  return (
    <button className={`${s.root} ${className}`} style={IconButtonStyle} {...restProps}>
      {isValidElement(icon) ? cloneElement(icon as ReactElement<any>, { size }) : null}
    </button>
  )
}
