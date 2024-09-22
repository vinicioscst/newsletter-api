import { z } from 'zod'

const parseDate = (val: string | Date) => {
  const parsedDate = new Date(val)
  return isNaN(parsedDate.getTime()) ? null : parsedDate
}

const articleSchema = z.object({
  id: z.string(),
  title: z.string().max(255),
  topic: z.string().max(50),
  subtopic: z.string().max(50),
  content: z.string(),
  publishedAt: z
    .union([z.date(), z.string()])
    .nullable()
    .transform((val) => (typeof val === 'string' ? parseDate(val) : val)),
  source: z.string().max(50),
  url: z.string(),
  image: z.string().nullable(),
  userId: z.string(),
  createdAt: z
    .union([z.date(), z.string()])
    .nullish()
    .transform((val) => (typeof val === 'string' ? parseDate(val) : val)),
  updatedAt: z
    .union([z.date(), z.string()])
    .nullish()
    .transform((val) => (typeof val === 'string' ? parseDate(val) : val))
})

const articleFormatSchema = articleSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true
})

const articleResponseSchema = articleSchema.omit({ userId: true })
const articleCreateSchema = articleSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true
})

const articleArraySchema = z.array(articleResponseSchema)
const articleCreateArraySchema = z.array(articleCreateSchema)

const articleEditSchema = articleFormatSchema.partial()

const articleGenerateSchema = z.object({
  topic: z.enum([
    'tech',
    'sports',
    'games',
    'music',
    'cars',
    'economy',
    'cinema',
    ''
  ])
})

const articleTopicsSchema = articleSchema.pick({
  topic: true
})

const articleTopicsArraySchema = z.array(articleTopicsSchema)

const articleSearchQuerySchema = z.optional(z.string())

const articleOrderQuerySchema = z.string().default('MaisRecente')

const defineOrderCreatedAtSchema = z.object({
  createdAt: z.enum(['desc', 'asc'])
})

const defineOrderTitleSchema = z.object({
  title: z.enum(['desc', 'asc'])
})

type TArticle = z.infer<typeof articleSchema>
type TArticleFormat = z.infer<typeof articleFormatSchema>
type TArticleResponse = z.infer<typeof articleResponseSchema>
type TArticleArray = z.infer<typeof articleArraySchema>
type TArticleEdit = z.infer<typeof articleEditSchema>
type TArticleCreateArray = z.infer<typeof articleCreateArraySchema>
type TArticleTopics = z.infer<typeof articleTopicsArraySchema>
type TArticleSearchQuery = z.infer<typeof articleSearchQuerySchema>
type TArticleDefineOrder = z.infer<
  typeof defineOrderCreatedAtSchema | typeof defineOrderTitleSchema
>

export {
  articleSchema,
  articleFormatSchema,
  articleResponseSchema,
  articleArraySchema,
  articleEditSchema,
  articleGenerateSchema,
  articleCreateArraySchema,
  articleSearchQuerySchema,
  articleOrderQuerySchema,
  TArticle,
  TArticleFormat,
  TArticleResponse,
  TArticleArray,
  TArticleEdit,
  TArticleCreateArray,
  TArticleTopics,
  TArticleSearchQuery,
  TArticleDefineOrder
}
