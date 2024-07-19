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
});

const articleFormatSchema = articleSchema.omit({
  id: true,
  userId: true,
});

const articleCreateSchema = articleSchema
  .omit({
    id: true,
  })
  .extend({
    user: z.object({
      connect: z.object({
        id: z.string(),
      }),
    }),
  });

type TArticle = z.infer<typeof articleSchema>;
type TArticleFormat = z.infer<typeof articleFormatSchema>;
type TArticleCreate = z.infer<typeof articleCreateSchema>;

export {
  articleSchema,
  articleFormatSchema,
  articleCreateSchema,
  TArticle,
  TArticleFormat,
  TArticleCreate,
};
