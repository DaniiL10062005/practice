import type { ListResponse, Pagination } from '../../types/general'
import type { CreateGenreRequest, Genre } from '../../types/genres'
import { privateApi, publicApi } from '../request-client'

export const CreateGenre = async (data: CreateGenreRequest): Promise<Genre> => {
  try {
    const response = await privateApi.post('api/v1/genres/', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetGenres = async (data: Pagination<undefined>): Promise<ListResponse<Genre>> => {
  try {
    const response = await publicApi.get('api/v1/genres/', { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const UpdateGenres = async (data: Genre): Promise<Genre> => {
  try {
    const response = await privateApi.patch('api/v1/genres/', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetGenresById = async (id: number): Promise<Genre> => {
  try {
    const response = await privateApi.get(`api/v1/genres/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const DeleteGenres = async (id: number): Promise<null> => {
  try {
    const response = await privateApi.delete(`api/v1/genres/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
