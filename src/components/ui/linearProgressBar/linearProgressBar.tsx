import { ReactElement } from 'react'

import s from './linearProgressBar.module.scss'

type Props = {
  className?: string
}
export const LinearProgressBar = ({ className }: Props): ReactElement => {
  return (
    <div className={`${s.container} ${className}`}>
      <div className={s.progressBar}></div>
    </div>
  )
}
