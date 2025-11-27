import { Button, Input, Modal } from 'antd'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import {
  useCreateGenre,
  useDeleteGenre,
  useGetGenreById,
  useUpdateGenre,
} from '../../../../../../utils/queries/hooks/genres'

type ChangeCategoryModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
  refetch: () => void
  id?: number
}

export const CategoryModal = ({ isOpen, setOpen, isChange, refetch, id }: ChangeCategoryModal) => {
  const { mutate, isPending } = useCreateGenre()
  const [categoryName, setCategoryName] = useState('')
  const { data: genreData } = useGetGenreById(id || -1)
  const { mutate: deleteGenre } = useDeleteGenre()
  const { mutate: updateGenre } = useUpdateGenre()

  const onCreate = () => {
    mutate(
      { genre: categoryName },
      {
        onSuccess: () => {
          setOpen(false)
          refetch()
        },
      }
    )
  }
  const onDelete = () => {
    deleteGenre(id || -1, {
      onSuccess: () => {
        setOpen(false)
        refetch()
      },
    })
  }
  const onSave = () => {
    updateGenre(
      { id: id || -1, genre: categoryName },
      {
        onSuccess: () => {
          setOpen(false)
          refetch()
          setCategoryName('')
        },
      }
    )
  }

  useEffect(() => {
    if (genreData) {
      setCategoryName(genreData.genre)
    }
  }, [genreData])
  return (
    <Modal
      title={isChange ? 'Изменение категории' : 'Создание категории'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={
        isChange
          ? [
              <Button disabled={isPending} onClick={onSave}>
                Сохранить
              </Button>,

              <Button color="red" variant="solid" disabled={isPending} onClick={onDelete}>
                Удалить
              </Button>,
            ]
          : [
              <Button disabled={isPending} onClick={onCreate}>
                Создать
              </Button>,
            ]
      }
    >
      <Input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Имя категории"
      />
    </Modal>
  )
}
