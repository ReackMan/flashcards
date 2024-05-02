import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Logo, LogoutIcon, PersonIcon } from '@/assets'
import { ButtonVariant, Route, TypographyVariant } from '@/common'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownItemWithIcon,
  Typography,
} from '@/components'

import s from './header.module.scss'

import { HeaderProfileInfo } from './headerProfileInfo'

type HeaderProps = {
  avatar?: string
  className?: string
  email?: string
  isDisabled: boolean
  isLoggedIn: boolean
  logout: () => void
  name?: string
} & ComponentPropsWithoutRef<'div'>

export const Header = forwardRef<ElementRef<'div'>, HeaderProps>(
  (
    {
      avatar = 'avatar',
      className,
      email = 'email',
      isDisabled,
      isLoggedIn,
      logout,
      name = 'name',
    },
    ref
  ) => {
    const navigate = useNavigate()

    const toProfile = () => {
      navigate(Route.Profile)
    }

    return (
      <header className={`${s.root} ${className}`} ref={ref}>
        <div className={s.headerContainer}>
          <Button as={Link} to={Route.Main} variant={ButtonVariant.Link}>
            <Logo className={s.logo} />
          </Button>
          {isLoggedIn && (
            <div className={s.profileInfoWrapper}>
              <Typography className={s.userName} variant={TypographyVariant.Subtitle1}>
                {name}
              </Typography>
              <Dropdown trigger={<Avatar image={avatar} size={'small'} userName={name} />}>
                <DropdownItem className={s.dropdownItemWrapper} onSelect={toProfile}>
                  <HeaderProfileInfo avatar={avatar} email={email} name={name} />
                </DropdownItem>
                <DropdownItemWithIcon
                  icon={<PersonIcon size={1.6} />}
                  onSelect={toProfile}
                  text={'My Profile'}
                />
                <DropdownItemWithIcon
                  disabled={isDisabled}
                  icon={<LogoutIcon size={1.6} />}
                  onSelect={logout}
                  text={'Logout'}
                />
              </Dropdown>
            </div>
          )}
          {!isLoggedIn && (
            <Button as={Link} to={Route.SignIn}>
              Sign In
            </Button>
          )}
        </div>
      </header>
    )
  }
)
