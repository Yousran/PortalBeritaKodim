import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";

// DELETE /api/categories/[id]
// Deletes a category by id. Requires ADMIN or EDITOR role.
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const authResult = await requireAnyRole(STAFF_ROLES);
    if (!authResult.ok) return authResult.response;

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 },
    );
  }
}
