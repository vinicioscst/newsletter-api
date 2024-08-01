import { z } from "zod";

const articleSchema = z.object({
  id: z.string(),
  title: z.string().max(255),
  topic: z.string().max(50),
  subtopic: z.string().max(50),
  publishedAt: z.date().nullable(),
  source: z.string().max(50),
  url: z.string(),
  image: z.string().nullable(),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

const articleFormatSchema = articleSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const articleResponseSchema = articleSchema.omit({ userId: true });
const articleCreateSchema = articleSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const articleArraySchema = z.array(articleResponseSchema);
const articleCreateArraySchema = z.array(articleCreateSchema);

const articleEditSchema = articleFormatSchema.partial();

const articleGenerateSchema = z.object({
  topic: z.enum([
    "tech",
    "sports",
    "games",
    "music",
    "cars",
    "economy",
    "cinema",
    "",
  ]),
});

const articleTopicsSchema = articleSchema.pick({
  topic: true,
});

const articleTopicsArraySchema = z.array(articleTopicsSchema);

const articleSearchQuerySchema = z.optional(z.string());

type TArticle = z.infer<typeof articleSchema>;
type TArticleFormat = z.infer<typeof articleFormatSchema>;
type TArticleResponse = z.infer<typeof articleResponseSchema>;
type TArticleArray = z.infer<typeof articleArraySchema>;
type TArticleEdit = z.infer<typeof articleEditSchema>;
type TArticleCreateArray = z.infer<typeof articleCreateArraySchema>;
type TArticleTopics = z.infer<typeof articleTopicsArraySchema>;

export {
  articleSchema,
  articleFormatSchema,
  articleResponseSchema,
  articleArraySchema,
  articleEditSchema,
  articleGenerateSchema,
  articleCreateArraySchema,
  articleSearchQuerySchema,
  TArticle,
  TArticleFormat,
  TArticleResponse,
  TArticleArray,
  TArticleEdit,
  TArticleCreateArray,
  TArticleTopics,
};
