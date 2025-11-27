import { Button, Flex, Pagination, Segmented, Typography, type SegmentedProps } from 'antd'
import { GoodCard } from './components/GoodCard'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { GoodModal } from './components/GoodModal'
import './goods.scss'
import type { Author } from '../../../../../../utils/types/authors'
import type { Book } from '../../../../../../utils/types/books'
import { AuthorModal } from './components/AuthorModal'
import { useDeleteAuthor } from '../../../../../../utils/queries/hooks/authors'

const { Title } = Typography

type Props = {
  authors: Author[] | undefined
  books: Book[] | undefined
  setBooksPage: Dispatch<SetStateAction<number>>
  totalBooks?: number
  refetchAuthors: () => void
  refetchBooks: () => void
  setSelectedAuthor: Dispatch<SetStateAction<Author | undefined>>
  selectedAuthor: Author | undefined
}

export const Goods = ({
  authors,
  books,
  setBooksPage,
  totalBooks,
  refetchAuthors,
  refetchBooks,
  setSelectedAuthor,
  selectedAuthor,
}: Props) => {
  useEffect(() => {})
  const [isModalOpen, setModalOpen] = useState(false)
  const [isAuthorModalOpen, setAuthorModalOpen] = useState(false)
  const [isAuthorChange, setIsAuthorChange] = useState(false)
  const { mutate: deleteAuthor } = useDeleteAuthor()

  const deleteSelectedAuthor = () => {
    if (selectedAuthor) {
      deleteAuthor(selectedAuthor?.id, {
        onSuccess: () => {
          setSelectedAuthor(undefined)
          refetchAuthors()
        },
      })
    }
  }

  const onEditAuthor = () => {
    if (authors === undefined) return

    if (authors.length === 0) return

    if (authors.length === 0) {
      setSelectedAuthor(authors[0])
      setAuthorModalOpen(true)
      setIsAuthorChange(true)
    } else if (selectedAuthor) {
      setAuthorModalOpen(true)
      setIsAuthorChange(true)
    }
  }
  const authorOptions: SegmentedProps['options'] = [
    { label: 'Без автора', value: 'all' },
    ...(authors ?? []).map((author) => ({
      label: author.name,
      value: author.id,
    })),
  ]
  return (
    <Flex style={{ width: '100%' }} align="center" gap={30} vertical>
      <Flex style={{ width: '100%' }} align="center" justify="space-between">
        <Title style={{ margin: '0' }} level={4}>
          Товары
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
      <Flex justify="space-between" style={{ width: '100%' }} align="center" gap={10}>
        <div className="goods__scroll-segmented">
          <Segmented
            size="large"
            options={authorOptions}
            onChange={(value) => {
              setSelectedAuthor(authors?.find((author) => author.id === value) ?? undefined)
            }}
          />
        </div>
        <Flex gap={2}>
          <Button
            onClick={() => {
              setAuthorModalOpen(true)
              setIsAuthorChange(false)
            }}
            style={{ padding: '10px' }}
            color="blue"
            variant="solid"
          >
            <PlusOutlined />
          </Button>
          <Button onClick={() => onEditAuthor()} style={{ padding: '10px' }}>
            <EditOutlined />
          </Button>
          <Button
            onClick={() => deleteSelectedAuthor()}
            style={{ padding: '10px' }}
            color="danger"
            variant="solid"
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      </Flex>
      <Flex gap={10} wrap>
        {books?.map((book, i) => (
          <GoodCard
            id={book.id}
            title={book.title}
            author={book.authors.map((a) => a.name).join(', ')}
            price={book.price}
            image={book.image}
            refetch={refetchBooks}
            key={i}
          />
        ))}
      </Flex>
      {totalBooks ? (
        <Pagination
          pageSize={4}
          defaultCurrent={1}
          total={totalBooks}
          onChange={(page) => setBooksPage(page)}
        />
      ) : null}

      <GoodModal
        refetch={refetchBooks}
        isChange={false}
        isOpen={isModalOpen}
        setOpen={setModalOpen}
      />
      <AuthorModal
        isChange={isAuthorChange}
        refetch={refetchAuthors}
        isOpen={isAuthorModalOpen}
        setOpen={setAuthorModalOpen}
        author={selectedAuthor}
      />
    </Flex>
  )
}
