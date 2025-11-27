import { useQuery, useMutation } from '@tanstack/react-query'
import type { CreateGenreRequest, Genre } from '../../types/genres'
import {
  CreateGenre,
  DeleteGenres,
  GetGenres,
  GetGenresById,
  UpdateGenres,
} from '../requests/genres'
import type { ListResponse, Pagination } from '../../types/general'

export const useCreateGenre = () => {
  return useMutation<Genre, Error, CreateGenreRequest>({
    mutationFn: (data) => CreateGenre(data),
  })
}

export const useGetGenres = (params: Pagination<undefined>) => {
  return useQuery<ListResponse<Genre>, Error>({
    queryKey: ['genres', params],
    queryFn: () => GetGenres(params),
  })
}

export const useUpdateGenre = () => {
  return useMutation<Genre, Error, Genre>({
    mutationFn: (data) => UpdateGenres(data),
  })
}

export const useGetGenreById = (id: number) => {
  return useQuery<Genre, Error>({
    queryKey: ['genre', id],
    queryFn: () => GetGenresById(id),
    enabled: id !== -1,
  })
}

export const useDeleteGenre = () => {
  return useMutation<null, Error, number>({
    mutationFn: (id) => DeleteGenres(id),
  })
}
