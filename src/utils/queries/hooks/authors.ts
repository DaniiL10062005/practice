import { useMutation, useQuery } from '@tanstack/react-query'
import type { Author, CreateAuthorResponse } from '../../types/authors'
import type { ListResponse, Pagination } from '../../types/general'
import {
  CreateAuthor,
  DeleteAuthor,
  GetAuthor,
  GetAuthorById,
  UpdateAuthor,
} from '../requests/authors'

export const useCreateAuthor = () => {
  return useMutation<Author, Error, CreateAuthorResponse>({
    mutationFn: (data) => CreateAuthor(data),
  })
}

export const useGetAuthors = (params: Pagination<undefined>) => {
  return useQuery<ListResponse<Author>, Error>({
    queryKey: ['authors', params],
    queryFn: () => GetAuthor(params),
  })
}

export const useUpdateAuthor = () => {
  return useMutation<Author, Error, Author>({
    mutationFn: (data) => UpdateAuthor(data),
  })
}

export const useGetAuthorById = (id: number) => {
  return useQuery<Author, Error>({
    queryKey: ['author', id],
    queryFn: () => GetAuthorById(id),
    enabled: id !== 0,
  })
}

export const useDeleteAuthor = () => {
  return useMutation<null, Error, number>({
    mutationFn: (id) => DeleteAuthor(id),
  })
}
