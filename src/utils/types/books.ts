export type CreateBookRequest = {
  title: string
  description: string
  image: string
  authors: number[]
  genres: number[]
  year: number
  publisher?: string
  publication_place?: string
  page_count: number
  price: number
}

export type Book = {
  id: number
  title: string
  description: string
  image: string
  year: number
  publisher: string
  publication_place: string
  page_count: number
  price: number
  authors: [
    {
      id: number
      name: string
    }
  ]
  genres: [
    {
      id: number
      genre: string
    }
  ]
}

export type GetBookRequest = {
  genre_ids?: string
  author_ids?: string
  min_price?: number
  max_price?: number
  year_from?: number
  year_to?: number
  search_text?: string
  page?: number
  limit?: number
}

export type UpdateBookRequest = {
  id: number
  title?: string
  description?: string
  image?: string
  authors?: number[]
  genres?: number[]
  year?: number
  publisher?: string
  publication_place?: string
  page_count?: number
  price?: number
}
