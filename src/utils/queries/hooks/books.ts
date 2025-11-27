import { useMutation, useQuery } from '@tanstack/react-query'
import type { Book, CreateBookRequest, GetBookRequest, UpdateBookRequest } from '../../types/books'
import {
  CreateBook,
  DeleteBook,
  GetBook,
  GetBookById,
  UpdateBook,
  UploadBookImage,
} from '../requests/books'
import type { ListResponse } from '../../types/general'

export const useCreateBook = () => {
  return useMutation<Book, Error, CreateBookRequest>({
    mutationFn: (data) => CreateBook(data),
  })
}

export const useGetBooks = (params: GetBookRequest) => {
  return useQuery<ListResponse<Book>, Error>({
    queryKey: ['books', params],
    queryFn: () => GetBook(params),
  })
}

export const useUpdateBook = () => {
  return useMutation<Book, Error, UpdateBookRequest>({
    mutationFn: (data) => UpdateBook(data),
  })
}

export const useGetBookById = (id: number) => {
  return useQuery<Book, Error>({
    queryKey: ['book', id],
    queryFn: () => GetBookById(id),
    enabled: id !== -1,
  })
}

export const useDeleteBook = () => {
  return useMutation<null, Error, number>({
    mutationFn: (id) => DeleteBook(id),
  })
}

export const useUploadBookImage = () => {
  return useMutation({
    mutationFn: (file: File) => UploadBookImage(file),
  })
}
