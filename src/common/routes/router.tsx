import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Route } from '@/common'
import { Header, Toast } from '@/components'
import { useLogoutMutation, useMeQuery } from '@/features'

import { PrivateRoutes } from './privateRoutes'
import { privateRoutes, publicRoutes } from './routerSettings'

const AppLayout = () => {
  const { data, isError } = useMeQuery()

  const [logout, { isLoading }] = useLogoutMutation()
  const isAuth = !isError

  return (
    <>
      <Toast />
      <Header
        avatar={data?.avatar}
        email={data?.email}
        isDisabled={isLoading}
        isLoggedIn={isAuth}
        logout={logout}
        name={data?.name}
      />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <AppLayout />,
    errorElement: <Navigate to={Route.NotFound} />,
  },
])

export const Router = () => <RouterProvider router={router} />
