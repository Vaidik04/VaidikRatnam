import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { repo } from "@/lib/db/repo";
import { isSupabaseConfigured, uploadToSupabaseStorage } from "@/lib/supabase/storage";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB per file
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
]);

// Verify magic bytes (file signature) to prevent extension spoofing
function verifyImageSignature(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  // WEBP: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageMedia")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const assetType = (formData.get("assetType") as string) || "stock_photo";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files supplied" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads/stock");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedAssets = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds maximum allowed size of 10MB.` },
          { status: 400 }
        );
      }

      if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
        return NextResponse.json(
          { error: `File ${file.name} has unsupported image format (${file.type}).` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (!verifyImageSignature(buffer)) {
        return NextResponse.json(
          { error: `File ${file.name} content signature does not match image format.` },
          { status: 400 }
        );
      }

      // Generate collision-free sanitized storage name with path traversal defense
      const sanitizedExt = path.extname(path.basename(file.name)).toLowerCase() || ".jpg";
      const safeRandom = crypto.randomBytes(8).toString("hex");
      const safeFilename = `stock_${Date.now()}_${safeRandom}${sanitizedExt}`;
      const storagePath = path.join(uploadDir, safeFilename);

      let publicUrl = `/uploads/stock/${safeFilename}`;
      let storagePathRef = publicUrl;

      if (isSupabaseConfigured()) {
        const supabaseRes = await uploadToSupabaseStorage(buffer, safeFilename, file.type, assetType);
        if (supabaseRes.success && supabaseRes.publicUrl) {
          publicUrl = supabaseRes.publicUrl;
          storagePathRef = supabaseRes.storagePath || publicUrl;
        } else {
          console.warn("Supabase upload failed, falling back to local disk:", supabaseRes.error);
          fs.writeFileSync(storagePath, buffer);
        }
      } else {
        fs.writeFileSync(storagePath, buffer);
      }

      const assetId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

      await repo.addMediaAsset({
        id: assetId,
        filename: safeFilename,
        original_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        storage_path: storagePathRef,
        url: publicUrl,
        alt_text: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
        caption: null,
        asset_type: assetType as "stock_photo" | "customer_inspiration" | "concept_image" | "cert_document",
        is_archived: 0,
        uploaded_by: session.email,
      });

      uploadedAssets.push({
        id: assetId,
        filename: safeFilename,
        originalName: file.name,
        url: publicUrl,
      });
    }

    await repo.addAuditLog({
      staff_email: session.email,
      action: "media_uploaded",
      entity_type: "media_assets",
      details: `Uploaded ${uploadedAssets.length} stock media files`,
    });

    return NextResponse.json({
      success: true,
      assets: uploadedAssets,
    });
  } catch (err: unknown) {
    console.error("Media upload handler error:", err);
    return NextResponse.json(
      { error: "Failed to process image upload on server." },
      { status: 500 }
    );
  }
}

