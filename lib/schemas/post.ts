import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  additionalAuthorIds: z.array(z.string()).optional().default([]),
  fullContent: z.string().min(10, "Konten wajib diisi"),
  summary: z.string().min(10, "Ringkasan wajib diisi"),
  published: z.boolean().optional().default(false),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreatePostFormErrors = Partial<
  Record<keyof CreatePostInput, string[]>
>;
