import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logoMain from '../../../public/logoMain.jpg'
import './layout.scss'
import { MenuOutlined } from '@ant-design/icons'
import { Button, Flex, Typography, Drawer, message } from 'antd'
import { useEffect, useState } from 'react'
import { palette } from '../../utils/theme/token'
import { LOCAL_STORAGE } from '../../utils/constants/local-storage'
import { useGetMe, useLogoutUser } from '../../utils/queries/hooks/user'
import { useUserStore } from '../../utils/store/user-store'

const { Title, Paragraph } = Typography

export function Layout() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) ? true : false
  const { mutate: logoutMutation, isPending: isLogoutPending } = useLogoutUser()
  const { mutate: getMe } = useGetMe()
  const { setUser, clearUser, user } = useUserStore()

  useEffect(() => {
    if (isAuthenticated && user) return
    getMe(undefined, {
      onSuccess: (user) => {
        setUser(user)
        navigate('/')
      },
      onError: (err) => {
        console.log('Ошибка получения пользователя', err)
      },
    })
  }, [])

  console.log(user)

  const menuItems = isAuthenticated
    ? user?.is_superuser
      ? [
          { path: '/', label: 'Главная' },
          { path: '/cart', label: 'Корзина' },
          { path: '/profile', label: 'Профиль' },
          { path: '/control', label: 'Управление' },
        ]
      : [
          { path: '/', label: 'Главная' },
          { path: '/cart', label: 'Корзина' },
          { path: '/profile', label: 'Профиль' },
        ]
    : [
        { path: '/', label: 'Главная' },
        { path: '/login', label: 'Войти' },
      ]

  const handleLogout = () => {
    if (isLogoutPending) return

    logoutMutation(undefined, {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)
        clearUser()
        navigate('/')
      },
      onError: (err) => {
        console.log('Ошибка логаута', err)
        message.error('Не удалось выйти из аккаунта')
      },
    })
  }
  return (
    <div className="layout">
      <nav className="layout__nav">
        <Flex justify="space-between" align="center" className="layout__nav--container">
          <Flex align="center" gap="10px">
            <img src={logoMain} alt="Логотип" className="layout__nav--logo" />
            <Title className="layout__title">reBook</Title>
          </Flex>
          <Flex
            align="center"
            justify="center"
            className="layout__nav--links"
            style={{ height: '100%' }}
          >
            {menuItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="layout__nav--link"
                style={location.pathname === path ? { backgroundColor: 'rgba(0,0,0,0.3)' } : {}}
              >
                <Title level={4} className="layout__title">
                  {label}
                </Title>
              </Link>
            ))}
            {isAuthenticated && (
              <div onClick={handleLogout} className="layout__nav--link">
                <Title level={4} className="layout__title">
                  Выйти
                </Title>
              </div>
            )}
          </Flex>

          <Button
            className="layout__nav--burger"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />

          <Drawer title="Меню" placement="right" onClose={() => setOpen(false)} open={open}>
            {menuItems.map(({ path, label }) => (
              <p key={path}>
                <Link
                  to={path}
                  onClick={() => setOpen(false)}
                  style={{
                    color: location.pathname === path ? palette.primary : palette.text,
                    fontWeight: 'bold',
                  }}
                >
                  {label}
                </Link>
              </p>
            ))}
          </Drawer>
        </Flex>
      </nav>
      <main className="layout__content">
        <div className="layout__content--container">
          <Outlet />
        </div>
      </main>
      <footer className="layout__footer">
        <Flex align="center" justify="space-between" className="layout__footer--container">
          <Flex vertical className="footer__contacts">
            <Paragraph className="layout__footer--info">Контакты:</Paragraph>
            <Paragraph className="layout__footer--info">
              <strong>Почта:</strong> example@mail.ru
            </Paragraph>
            <Paragraph className="layout__footer--info">
              <strong>Телефон:</strong> +7 (999) 999-99-99
            </Paragraph>
          </Flex>
          <Flex vertical className="footer__info">
            <Paragraph className="layout__footer--info">
              <strong>ОГРН:</strong> 1107746105928
            </Paragraph>
            <Paragraph className="layout__footer--info">
              <strong>КПП:</strong> 771501001
            </Paragraph>
            <Paragraph className="layout__footer--info">
              <strong>ИНН:</strong> 7723748489
            </Paragraph>
          </Flex>
        </Flex>
      </footer>
    </div>
  )
}
