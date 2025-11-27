import { Tabs } from 'antd'
import { Grid } from 'antd'
import './control.scss'
import { ControlOrders } from './components/orders/ControlOrders'
import { ControlGoods } from './components/goods/ControlGoods'
import { useAuthGuard } from '../../utils/hooks/use-auth-guard'
import { useUserStore } from '../../utils/store/user-store'

export const ControlPage = () => {
  const screens = Grid.useBreakpoint()
  const { isAuthenticated } = useAuthGuard()
  const user = useUserStore((state) => state.user)

  if (!isAuthenticated) return null
  if (!user || !user.is_superuser) return null

  const CONTROL_PAGES = [
    {
      label: 'Товары',
      elem: <ControlGoods />,
    },
    {
      label: 'Заказы',
      elem: <ControlOrders />,
    },
  ]
  return (
    <div className="control">
      <Tabs
        className="control__tabs"
        defaultActiveKey="0"
        tabPosition={screens.md ? 'left' : 'top'}
        items={CONTROL_PAGES.map((item, index) => ({
          label: item.label,
          key: String(index),
          children: item.elem,
        }))}
      />
    </div>
  )
}
