import { Card, Flex, Typography } from 'antd'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { CategoryModal } from '../CategoryModal'
import './category-item.scss'
import { EditOutlined } from '@ant-design/icons'
import type { Genre } from '../../../../../../../utils/types/genres'

const { Text } = Typography

type Props = {
  name: string
  id: number
  refetch: () => void
  setSelectedGenre?: Dispatch<SetStateAction<Genre | undefined>>
}

export const CategoryItem = ({ name, id, refetch, setSelectedGenre }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Card
        className="category-item-container"
        hoverable
        onClick={() => setSelectedGenre?.({ id, genre: name })}
      >
        <Flex align="center" justify="space-between">
          <Text>{name}</Text>
          <EditOutlined onClick={() => setModalOpen(true)} />
        </Flex>
      </Card>
      <CategoryModal
        id={id}
        refetch={refetch}
        isChange={true}
        isOpen={isModalOpen}
        setOpen={setModalOpen}
      />
    </>
  )
}
