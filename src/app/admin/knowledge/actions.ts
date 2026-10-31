"use server";

import { getDb, initDb } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function toggleArticlePublishAction(articleId: string, publish: boolean): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageArticles")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    if (!articleId || typeof articleId !== "string" || articleId.length > 100) {
      return { success: false, message: "Invalid article identifier." };
    }

    await initDb();
    const db = getDb();
    const newStatus = publish ? "published" : "draft";
    const now = new Date().toISOString();

    await db.execute({
      sql: `UPDATE articles SET status = ?, updated_at = ? WHERE id = ?`,
      args: [newStatus, now, articleId],
    });

    const { repo } = await import("@/lib/db/repo");
    await repo.addAuditLog({
      staff_email: session.email,
      action: "article_status_changed",
      entity_type: "article",
      entity_id: articleId,
      details: `Article status updated to ${newStatus}`,
    });

    revalidatePath("/learn");
    revalidatePath("/admin/knowledge");

    return { success: true };
  } catch (err: unknown) {
    console.error("Article publish error:", err);
    return { success: false, message: "Failed to update article status." };
  }
}
