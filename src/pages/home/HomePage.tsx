import { Card, Flex, Input, Pagination } from 'antd'
import { Category } from './components/category/Category'
import './home-page.scss'
import { ProductsGrid } from './components/products-grid/ProductsGrid'
import { useState } from 'react'
import type { Genre } from '../../utils/types/genres'
import { useGetGenres } from '../../utils/queries/hooks/genres'
import { useGetBooks } from '../../utils/queries/hooks/books'
import { useGetAuthors } from '../../utils/queries/hooks/authors'
import type { Author } from '../../utils/types/authors'
import { Authors } from './components/authors/Authors'

const { Search } = Input

export const HomePage = () => {
  const [bookPage, setBookPage] = useState(1)
  const [searchText, setSearchText] = useState<string | undefined>(undefined)
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined)
  const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)

  const { data: authors } = useGetAuthors({ page: 1, limit: 20 })
  const { data: books } = useGetBooks({
    page: bookPage,
    limit: 20,
    search_text: searchText ? searchText : undefined,
    genre_ids: selectedGenre ? selectedGenre.id.toString() : undefined,
    author_ids: selectedAuthor ? selectedAuthor.id.toString() : undefined,
  })
  const { data: genre } = useGetGenres({ page: 1, limit: 20 })

  return (
    <Flex style={{ height: '100%' }} vertical align="center" justify="space-between" gap={20}>
      <Card variant="borderless" style={{ width: '100%' }}>
        <Flex vertical gap={10}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="large"
            placeholder="Поиск"
          />
          <Flex vertical align="start" gap={10} className="home__category">
            <Category genres={genre?.data} setSelectedGenre={setSelectedGenre} />
            <Authors authors={authors?.data} setSelectedAuthor={setSelectedAuthor} />
          </Flex>
        </Flex>
      </Card>
      <ProductsGrid books={books?.data} />
      {books?.meta?.total ? (
        <Pagination
          pageSize={20}
          defaultCurrent={1}
          total={books.meta.total}
          onChange={(page) => setBookPage(page)}
        />
      ) : null}
    </Flex>
  )
}
