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

const articleArraySchema = z.array(articleResponseSchema);

const articleEditSchema = articleFormatSchema.partial();

const articleCreateSchema = articleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

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

type TArticle = z.infer<typeof articleSchema>;
type TArticleFormat = z.infer<typeof articleFormatSchema>;
type TArticleResponse = z.infer<typeof articleResponseSchema>;
type TArticleArray = z.infer<typeof articleArraySchema>;
type TArticleEdit = z.infer<typeof articleEditSchema>;
type TArticleCreate = z.infer<typeof articleCreateSchema>;

export {
  articleSchema,
  articleFormatSchema,
  articleResponseSchema,
  articleArraySchema,
  articleEditSchema,
  articleCreateSchema,
  articleGenerateSchema,
  TArticle,
  TArticleFormat,
  TArticleResponse,
  TArticleArray,
  TArticleEdit,
  TArticleCreate,
};
