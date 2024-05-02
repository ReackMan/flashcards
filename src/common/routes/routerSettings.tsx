import { Navigate, RouteObject } from 'react-router-dom'

import { Route } from '@/common'
import {
  CreateNewPasswordPage,
  DeckPage,
  DecksPage,
  ForgotPasswordPage,
  LearnPage,
  NotFoundPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '@/pages'

export const privateRoutes: RouteObject[] = [
  { element: <Navigate to={Route.Decks} />, path: Route.Main },
  { element: <ProfilePage />, path: Route.Profile },
  { element: <DecksPage />, path: Route.Decks },
  { element: <DeckPage />, path: `${Route.Decks}/:id/cards` },
  { element: <LearnPage />, path: `${Route.Decks}/:id/learn` },
]

export const publicRoutes: RouteObject[] = [
  { element: <SignInPage />, path: Route.SignIn },
  { element: <SignUpPage />, path: Route.SignUp },
  { element: <ForgotPasswordPage />, path: Route.ForgotPassword },
  { element: <CreateNewPasswordPage />, path: `${Route.CreateNewPassword}/:token` },
  { element: <NotFoundPage />, path: Route.NotFound },
]
