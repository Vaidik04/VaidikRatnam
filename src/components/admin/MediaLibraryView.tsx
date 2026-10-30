"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { MediaAsset } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Upload,
  Search,
  Check,
  Copy,
  Grid,
  List,
  AlertCircle,
} from "lucide-react";

interface MediaLibraryViewProps {
  initialAssets: MediaAsset[];
  unlinkedCount?: number;
}

export function MediaLibraryView({ initialAssets }: MediaLibraryViewProps) {
  const [assets] = useState<MediaAsset[]>(initialAssets);
  const [filterType, setFilterType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = assets.filter((asset) => {
    if (filterType && asset.asset_type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        asset.original_name.toLowerCase().includes(q) ||
        asset.filename.toLowerCase().includes(q) ||
        (asset.alt_text && asset.alt_text.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("assetType", "stock_photo");

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh page to load newly created DB assets
        window.location.reload();
      } else {
        setUploadError(data.error || "Failed to upload selected files.");
      }
    } catch {
      setUploadError("Network error during file upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
            Digital Asset Management
          </span>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            Existing Stock Image Library
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Upload stock photos directly from phone or desktop. Unlinked photos remain private until assigned to a product record.
          </p>
        </div>

        {/* Upload Action */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            variant="primary"
            size="md"
            isLoading={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="text-xs uppercase tracking-wider font-semibold"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload New Photos
          </Button>
        </div>
      </div>

      {uploadError && (
        <div className="p-3.5 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5DFD5] rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8F9691] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by file name or alt text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D4CCC0] rounded-sm text-[#182522] focus:outline-none focus:ring-1 focus:ring-[#173B32]"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-[#D4CCC0] rounded-sm text-[#182522] focus:outline-none focus:ring-1 focus:ring-[#173B32]"
          >
            <option value="">All Asset Types</option>
            <option value="stock_photo">Physical Stock Photos</option>
            <option value="customer_inspiration">Inspiration Uploads</option>
            <option value="concept_image">Concept Images</option>
            <option value="cert_document">Cert Documents</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#626A65] font-mono mr-2">
            {filteredAssets.length} assets
          </span>

          <div className="flex items-center border border-[#D4CCC0] rounded-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 ${viewMode === "grid" ? "bg-[#173B32] text-white" : "bg-white text-[#626A65]"}`}
              aria-label="Grid view"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 ${viewMode === "table" ? "bg-[#173B32] text-white" : "bg-white text-[#626A65]"}`}
              aria-label="Table view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="group overflow-hidden bg-white border border-[#E5DFD5] flex flex-col justify-between">
              <div className="relative aspect-square bg-[#F4EFE6] overflow-hidden">
                <Image
                  src={asset.url}
                  alt={asset.alt_text || asset.original_name}
                  fill
                  sizes="160px"
                  className="object-cover group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute top-1.5 left-1.5">
                  <span className="text-[9px] font-mono uppercase bg-[#182522]/80 text-white px-1.5 py-0.5 rounded-xs">
                    {(asset.file_size / 1024).toFixed(0)} KB
                  </span>
                </div>
              </div>

              <div className="p-2.5 text-xs space-y-1">
                <p className="font-medium text-[#182522] truncate text-[11px]" title={asset.original_name}>
                  {asset.original_name}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-[#8F9691] uppercase font-mono">
                    {asset.asset_type.replace(/_/g, " ")}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyUrl(asset.id, asset.url)}
                    className="p-1 text-[#626A65] hover:text-[#173B32] transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-[#1B6442]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-[#E5DFD5] rounded-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F4ED] border-b border-[#E5DFD5] text-[#626A65] uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Preview</th>
                <th className="py-2.5 px-3">File Name</th>
                <th className="py-2.5 px-3">Asset Type</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Uploaded</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE2]">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-[#F7F4ED]/50">
                  <td className="py-2 px-3">
                    <div className="relative w-10 h-10 bg-[#F4EFE6] rounded-xs overflow-hidden">
                      <Image src={asset.url} alt={asset.original_name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <strong className="text-[#182522] block font-medium">{asset.original_name}</strong>
                    <span className="text-[11px] font-mono text-[#8F9691]">{asset.filename}</span>
                  </td>
                  <td className="py-2 px-3">
                    <span className="capitalize">{asset.asset_type.replace(/_/g, " ")}</span>
                  </td>
                  <td className="py-2 px-3 font-mono text-[11px]">
                    {(asset.file_size / 1024).toFixed(1)} KB
                  </td>
                  <td className="py-2 px-3 text-[#626A65]">
                    {new Date(asset.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => copyUrl(asset.id, asset.url)}
                      className="text-xs text-[#173B32] hover:underline"
                    >
                      {copiedId === asset.id ? "Copied" : "Copy Path"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
