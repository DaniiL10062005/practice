import type { Book, CreateBookRequest, GetBookRequest, UpdateBookRequest } from '../../types/books'
import type { ListResponse } from '../../types/general'
import { privateApi, publicApi } from '../request-client'

export const CreateBook = async (data: CreateBookRequest): Promise<Book> => {
  try {
    const response = await privateApi.post('api/v1/books/', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetBook = async (data: GetBookRequest): Promise<ListResponse<Book>> => {
  try {
    const response = await publicApi.get('api/v1/books/', { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const UpdateBook = async (data: UpdateBookRequest): Promise<Book> => {
  try {
    const response = await privateApi.patch('api/v1/books/', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetBookById = async (id: number): Promise<Book> => {
  try {
    const response = await publicApi.get(`api/v1/books/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const DeleteBook = async (id: number): Promise<null> => {
  try {
    const response = await privateApi.delete(`api/v1/books/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
export const UploadBookImage = async (file: File): Promise<{ filename: string }> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await privateApi.post('files/upload', formData)

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
