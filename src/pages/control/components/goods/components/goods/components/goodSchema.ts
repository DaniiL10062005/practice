import { z } from 'zod'

export const goodSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  price: z
    .string()
    .min(1, 'Обязательное поле')
    .regex(/^[0-9]+$/, 'Цена указывается цифрами'),
  page_count: z
    .string()
    .min(1, 'Обязательное поле')
    .regex(/^[0-9]+$/, 'Цена указывается цифрами'),
  year: z
    .string()
    .min(4, 'Введите корректный год')
    .max(4, 'Введите корректный год')
    .regex(/^\d{4}$/, 'Год указывается 4 цифрами'),
  genres: z.array(z.number()).min(1, { message: 'Нужно выбрать хотя бы один жанр' }),
  authors: z.array(z.number()).min(1, { message: 'Нужно выбрать хотя бы одного автора' }),
  image: z.array(z.any()),
})

export type GoodForm = z.infer<typeof goodSchema>
