import { Card, Flex } from 'antd'
import { useState } from 'react'
import './good-card.scss'
import { GoodModal } from './GoodModal'

const { Meta } = Card

type Props = {
  title: string
  author: string
  price: number
  image: string
  refetch: () => void
  id: number
}

export const GoodCard = ({ title, author, price, image, refetch, id }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Card
        className="container"
        onClick={() => setOpenModal(true)}
        hoverable
        cover={
          <img
            className="container__image"
            draggable={false}
            alt={title}
            src={`https://testapi.2neko.ru/files/${image}`}
          />
        }
      >
        <Meta
          title={title}
          description={
            <Flex vertical>
              <span>{author}</span>
              <span>{price} руб.</span>
            </Flex>
          }
        />
      </Card>
      <GoodModal
        refetch={refetch}
        isOpen={openModal}
        setOpen={setOpenModal}
        id={id}
        isChange={true}
      />
    </>
  )
}
