import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import slugify from "slugify";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { createCategorySchema } from "@/lib/schemas/category";

type SessionUser = typeof auth.$Infer.Session.user;

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json(
        { error: "Tidak terautentikasi" },
        { status: 401 },
      );
    }
    const userRole = (session.user as SessionUser).role ?? "";
    if (!["ADMIN", "EDITOR"].includes(userRole)) {
      return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const { color } = parsed.data;
    const name = parsed.data.name.toLowerCase();
    const slug = slugify(name, { lower: true, strict: true });

    const existing = await prisma.category.findFirst({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: { name: ["Kategori dengan nama ini sudah ada"] },
        },
        { status: 422 },
      );
    }

    const category = await prisma.category.create({
      data: { name, slug, color },
    });

    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat kategori" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json(
        { error: "Tidak terautentikasi" },
        { status: 401 },
      );
    }
    const userRole = (session.user as SessionUser).role ?? "";
    if (!["ADMIN", "EDITOR"].includes(userRole)) {
      return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Parameter id diperlukan" },
        { status: 400 },
      );
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 },
    );
  }
}
