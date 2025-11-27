import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { goodSchema, type GoodForm } from './goodSchema'
import {
  useCreateBook,
  useDeleteBook,
  useGetBookById,
  useUpdateBook,
  useUploadBookImage,
} from '../../../../../../../utils/queries/hooks/books'
import { useGetGenres } from '../../../../../../../utils/queries/hooks/genres'
import { useGetAuthors } from '../../../../../../../utils/queries/hooks/authors'
import { useEffect } from 'react'

type ChangeCategoryModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
  refetch: () => void
  id?: number
}

const FILE_BASE_URL = 'https://testapi.2neko.ru/files/'

export const GoodModal = ({ isOpen, setOpen, isChange, refetch, id }: ChangeCategoryModal) => {
  const { data: book } = useGetBookById(id ?? -1)

  const { control, handleSubmit, reset } = useForm<GoodForm>({
    resolver: zodResolver(goodSchema),
    defaultValues: {
      title: '',
      description: '',
      authors: [],
      price: '',
      image: [],
      page_count: '',
      year: '',
      genres: [],
    },
  })

  const { mutate: createBook } = useCreateBook()
  const { mutate: uploadImage } = useUploadBookImage()
  const { mutate: updateBook } = useUpdateBook()
  const { mutate: deleteBook } = useDeleteBook()

  const { data: genres } = useGetGenres({ page: 1, limit: 10 })
  const { data: authors } = useGetAuthors({ page: 1, limit: 10 })

  useEffect(() => {
    if (!isChange || !book) return

    reset({
      title: book.title,
      description: book.description,
      authors: book.authors.map((a) => a.id),
      price: String(book.price),
      page_count: String(book.page_count),
      year: String(book.year),
      genres: book.genres.map((g) => g.id),
      image: book.image
        ? [
            {
              uid: '-1',
              name: book.image,
              status: 'done',
              url: FILE_BASE_URL + book.image,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ]
        : [],
    })
  }, [isChange, book, reset])

  useEffect(() => {
    if (!isOpen || isChange) return
    reset({
      title: '',
      description: '',
      authors: [],
      price: '',
      image: [],
      page_count: '',
      year: '',
      genres: [],
    })
  }, [isOpen, isChange, reset])

  const close = () => setOpen(false)

  const onSubmit = (data: GoodForm) => {
    if (isChange && id && book) {
      return handleUpdate(data, id, book.image)
    }

    return handleCreate(data)
  }

  const handleCreate = (data: GoodForm) => {
    const file = data.image?.[0]?.originFileObj as File | undefined

    if (!file) {
      console.error('Файл не выбран')
      return
    }

    uploadImage(file, {
      onSuccess: (res) => {
        const imagePath = res.filename

        createBook(
          {
            title: data.title,
            description: data.description,
            authors: data.authors,
            price: Number(data.price),
            image: imagePath,
            genres: data.genres,
            page_count: Number(data.page_count),
            year: Number(data.year),
          },
          {
            onSuccess: () => {
              refetch()
              reset()
              close()
            },
          }
        )
      },
    })
  }

  const handleUpdate = (data: GoodForm, id: number, existingImage?: string) => {
    const file = data.image?.[0]?.originFileObj as File | undefined

    const runUpdate = (imagePath: string) => {
      updateBook(
        {
          id,
          title: data.title,
          description: data.description,
          authors: data.authors,
          price: Number(data.price),
          image: imagePath,
          genres: data.genres,
          page_count: Number(data.page_count),
          year: Number(data.year),
        },
        {
          onSuccess: () => {
            refetch()
            reset()
            close()
          },
        }
      )
    }

    if (!file) {
      if (!existingImage) {
        console.error('Нет файла и нет текущего image')
        return
      }
      runUpdate(existingImage)
      return
    }

    uploadImage(file, {
      onSuccess: (res) => {
        runUpdate(res.filename)
      },
    })
  }

  const onDelete = () => {
    if (!id) return

    deleteBook(id, {
      onSuccess: () => {
        refetch()
        reset()
        close()
      },
    })
  }

  return (
    <Modal
      title={isChange ? 'Изменение товара' : 'Создание товара'}
      open={isOpen}
      onCancel={close}
      footer={
        isChange
          ? [
              <Button key="delete" danger onClick={onDelete}>
                Удалить
              </Button>,
              <Button key="save" onClick={handleSubmit(onSubmit)}>
                Сохранить
              </Button>,
            ]
          : [
              <Button key="create" onClick={handleSubmit(onSubmit)}>
                Создать
              </Button>,
            ]
      }
    >
      <Form layout="vertical">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Название книги"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Описание книги"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input.TextArea rows={4} {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Цена"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="page_count"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Количество страниц"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="year"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Год"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="genres"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Жанры"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Select
                mode="multiple"
                placeholder="Выберите жанры"
                value={field.value}
                onChange={(values) => field.onChange(values)}
                options={(genres?.data ?? []).map((g) => ({
                  label: g.genre,
                  value: g.id,
                }))}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="authors"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Авторы"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Select
                mode="multiple"
                placeholder="Выберите автора"
                value={field.value}
                onChange={(values) => field.onChange(values)}
                options={(authors?.data ?? []).map((a) => ({
                  label: a.name,
                  value: a.id,
                }))}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Обложка"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Upload
                listType="picture-card"
                accept="image/*"
                maxCount={1}
                beforeUpload={() => false}
                fileList={field.value}
                onChange={(info) => field.onChange(info.fileList)}
                onRemove={() => field.onChange([])}
              >
                {field.value.length === 0 && <div>Загрузить</div>}
              </Upload>
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  )
}
