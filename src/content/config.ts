import { defineCollection } from "astro:content"
import { z } from "zod"

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    _slug: z.string(),
    image: z.string(),
    author: z.string(),
    abstract: z.string(),
  }),
})
export const collections = { articles }
