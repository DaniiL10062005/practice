import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Typography } from 'antd'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { CategoryModal } from './CategoryModal'
import { CategoryItem } from './components/CategoryItem'
import './categories.scss'
import type { Genre } from '../../../../../../utils/types/genres'

const { Title, Text } = Typography

type Props = {
  categories: Genre[] | undefined
  refetch: () => void
  setSelectedGenre?: Dispatch<SetStateAction<Genre | undefined>>
}

export const ControlCategories = ({ categories, refetch, setSelectedGenre }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Flex style={{ width: '20%' }} gap={30} className="container" vertical>
        <Flex justify="space-between" gap={30} align="center">
          <Title style={{ margin: '0' }} level={4}>
            Категории
          </Title>
          <Button
            onClick={() => setModalOpen(true)}
            style={{ padding: '10px' }}
            color="blue"
            variant="solid"
          >
            <PlusOutlined />
          </Button>
        </Flex>
        <Flex gap={10} className="container__category" vertical>
          <Card
            className="category-item-container"
            hoverable
            onClick={() => setSelectedGenre?.(undefined)}
          >
            <Flex align="center" justify="space-between">
              <Text>Все</Text>
            </Flex>
          </Card>
          {categories?.map((cat) => (
            <CategoryItem
              id={cat.id}
              refetch={refetch}
              key={cat.id}
              name={cat.genre}
              setSelectedGenre={setSelectedGenre}
            />
          ))}
        </Flex>
      </Flex>
      <CategoryModal
        isChange={false}
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        refetch={refetch}
      />
    </>
  )
}
