import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import slugify from "slugify";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { createPostSchema } from "@/lib/schemas/post";
export type { CreatePostInput } from "@/lib/schemas/post";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json(
        { error: "Tidak terautentikasi" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const {
      title,
      categoryId,
      additionalAuthorIds,
      fullContent,
      summary,
      published,
    } = parsed.data;

    // Generate a unique slug
    const baseSlug = slugify(title, { lower: true, strict: true });
    const existing = await prisma.post.findMany({
      where: { slug: { startsWith: baseSlug } },
      select: { slug: true },
    });
    const slugSet = new Set(existing.map((p) => p.slug));
    let slug = baseSlug;
    let counter = 1;
    while (slugSet.has(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    // Collect all author IDs: session user + additional (deduped)
    const authorIds = Array.from(
      new Set([session.user.id, ...additionalAuthorIds]),
    );

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        summary,
        fullContent,
        categoryId,
        published,
        authors: {
          connect: authorIds.map((id) => ({ id })),
        },
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        authors: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat postingan" },
      { status: 500 },
    );
  }
}
