import { Card, Flex } from 'antd'
import { ControlCategories } from './components/category/ControlCategories'
import { Goods } from './components/goods/Goods'
import { useGetGenres } from '../../../../utils/queries/hooks/genres'
import { useGetAuthors } from '../../../../utils/queries/hooks/authors'
import { useGetBooks } from '../../../../utils/queries/hooks/books'
import { useEffect, useState } from 'react'
import type { Author } from '../../../../utils/types/authors'
import type { Genre } from '../../../../utils/types/genres'

export const ControlGoods = () => {
  const [booksPage, setBooksPage] = useState(1)
  const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined)

  const { data: genres, refetch: refetchGenres } = useGetGenres({ page: 1, limit: 10 })
  const { data: authors, refetch: refetchAuthors } = useGetAuthors({ page: 1, limit: 10 })
  const { data: books, refetch: refetchBooks } = useGetBooks({
    page: booksPage,
    limit: 4,
    author_ids: selectedAuthor ? selectedAuthor.id.toString() : undefined,
    genre_ids: selectedGenre ? selectedGenre.id.toString() : undefined,
  })

  useEffect(() => {
    setBooksPage(1)
  }, [selectedAuthor, selectedGenre])

  return (
    <Card>
      <Flex gap={50} align="start">
        <ControlCategories
          setSelectedGenre={setSelectedGenre}
          refetch={refetchGenres}
          categories={genres?.data}
        />
        <Goods
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          refetchAuthors={refetchAuthors}
          refetchBooks={refetchBooks}
          totalBooks={books?.meta.total}
          setBooksPage={setBooksPage}
          authors={authors?.data}
          books={books?.data}
        />
      </Flex>
    </Card>
  )
}
