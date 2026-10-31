/**
 * VAIDIK RATNAM — SUPABASE STORAGE ADAPTER
 * Lightweight, zero-dependency REST client for Supabase Storage buckets.
 * Automatically falls back to local storage if Supabase credentials are not set.
 */

export interface SupabaseUploadResult {
  success: boolean;
  publicUrl?: string;
  storagePath?: string;
  error?: string;
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key);
}

/**
 * Upload an image buffer directly to Supabase Storage bucket
 */
export async function uploadToSupabaseStorage(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string,
  folder = "stock"
): Promise<SupabaseUploadResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "jewellery-media";

  if (!supabaseUrl || !apiKey) {
    return {
      success: false,
      error: "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are not configured.",
    };
  }

  try {
    const objectPath = `${folder}/${filename}`;
    const endpoint = `${supabaseUrl}/storage/v1/object/${bucket}/${objectPath}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        apikey: apiKey,
        "Content-Type": mimeType,
        "x-upsert": "true",
      },
      body: new Uint8Array(fileBuffer),
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        success: false,
        error: `Supabase Storage upload failed with status ${res.status}: ${errText}`,
      };
    }

    // Public URL format for public Supabase buckets
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

    return {
      success: true,
      publicUrl,
      storagePath: objectPath,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: `Network error connecting to Supabase Storage: ${message}`,
    };
  }
}

