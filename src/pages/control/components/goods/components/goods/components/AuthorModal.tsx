import { Button, Input, Modal } from 'antd'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useCreateAuthor, useUpdateAuthor } from '../../../../../../../utils/queries/hooks/authors'
import type { Author } from '../../../../../../../utils/types/authors'

type ChangeAuthorModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
  refetch: () => void
  author?: Author | null
}

export const AuthorModal = ({ isOpen, setOpen, isChange, refetch, author }: ChangeAuthorModal) => {
  const [authorName, setAuthorName] = useState('')
  const { mutate } = useCreateAuthor()
  const { mutate: updateAuthor } = useUpdateAuthor()

  const onOk = () => {
    if (isChange && author) {
      updateAuthor(
        {
          id: author.id,
          name: authorName,
        },
        {
          onSuccess: () => {
            refetch()
            setOpen(false)
            setAuthorName('')
          },
        }
      )
    } else {
      mutate(
        {
          name: authorName,
        },
        {
          onSuccess: () => {
            refetch()
            setOpen(false)
            setAuthorName('')
          },
        }
      )
    }
  }
  return (
    <Modal
      title={isChange ? 'Изменение автора' : 'Создание автора'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={[<Button onClick={onOk}>Сохранить</Button>]}
    >
      <Input
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder={isChange ? author?.name : 'Имя автора'}
      />
    </Modal>
  )
}
