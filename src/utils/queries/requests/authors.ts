import type { Author, CreateAuthorResponse } from '../../types/authors'
import type { ListResponse, Pagination } from '../../types/general'
import { privateApi, publicApi } from '../request-client'

export const CreateAuthor = async (data: CreateAuthorResponse): Promise<Author> => {
  try {
    const response = await privateApi.post('api/v1/authors/', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetAuthor = async (data: Pagination<undefined>): Promise<ListResponse<Author>> => {
  try {
    const response = await publicApi.get('api/v1/authors/', { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const UpdateAuthor = async (data: Author): Promise<Author> => {
  try {
    const response = await privateApi.patch('api/v1/authors/', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetAuthorById = async (id: number): Promise<Author> => {
  try {
    const response = await publicApi.get(`api/v1/authors/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const DeleteAuthor = async (id: number): Promise<null> => {
  try {
    const response = await privateApi.delete(`api/v1/authors/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
