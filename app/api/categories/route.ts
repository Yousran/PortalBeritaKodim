import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, color: true },
    });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data kategori" },
      { status: 500 },
    );
  }
}
