import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'

import s from './iconButton.module.scss'

type IconButtonProps = {
  icon: ReactNode
  size?: number
} & ComponentPropsWithoutRef<'button'>

export const IconButton = forwardRef<ElementRef<'button'>, IconButtonProps>(
  ({ className, icon, size: sizeProp, ...restProps }, ref) => {
    const size = sizeProp ? `${sizeProp}rem` : '2.4rem'

    const IconButtonStyle: CSSProperties = {
      height: size,
      width: size,
    }

    return (
      <button className={`${s.root} ${className}`} ref={ref} style={IconButtonStyle} {...restProps}>
        {isValidElement(icon) ? cloneElement(icon as ReactElement<any>, { size }) : null}
      </button>
    )
  }
)
