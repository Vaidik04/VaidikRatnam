import React from "react";
import Link from "next/link";
import Image from "next/image";
import { repo } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusChangeDropdown } from "@/components/admin/StatusChangeDropdown";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { Plus, FileSpreadsheet, Search, ExternalLink, Edit } from "lucide-react";

export const metadata = {
  title: "Products & Inventory — Vaidik Ratnam Admin",
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status || "";
  const searchQuery = params.search?.toLowerCase() || "";

  const allProducts = await repo.getAdminProducts();

  const filteredProducts = allProducts.filter((p) => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (searchQuery) {
      return (
        p.name.toLowerCase().includes(searchQuery) ||
        p.sku.toLowerCase().includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
            Inventory Management
          </span>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            Shop Stock &amp; Products
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Manage physical stock records, purity hallmarks, and live availability statuses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ExportCsvButton
            data={allProducts as unknown as Record<string, unknown>[]}
            filename="vaidik_ratnam_products_inventory"
            label="Export Stock CSV"
          />
          <Link href="/admin/products/import-csv">
            <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
              CSV Import
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button variant="primary" size="sm" className="text-xs uppercase tracking-wider font-semibold">
              <Plus className="w-3.5 h-3.5 mr-1" />
              New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs and Search */}
      <div className="bg-white border border-[#E5DFD5] rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-thin">
          <Link
            href="/admin/products"
            className={`text-xs px-3 py-1.5 rounded-xs uppercase tracking-wider font-medium whitespace-nowrap ${
              !statusFilter ? "bg-[#173B32] text-white" : "bg-[#F7F4ED] text-[#182522]"
            }`}
          >
            All ({allProducts.length})
          </Link>
          {["published", "draft", "incomplete", "reserved", "sold", "archived"].map((st) => (
            <Link
              key={st}
              href={`/admin/products?status=${st}`}
              className={`text-xs px-3 py-1.5 rounded-xs uppercase tracking-wider font-medium whitespace-nowrap capitalize ${
                statusFilter === st ? "bg-[#173B32] text-white" : "bg-[#F7F4ED] text-[#182522]"
              }`}
            >
              {st}
            </Link>
          ))}
        </div>

        <form method="GET" action="/admin/products" className="relative w-full sm:w-64">
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <Search className="w-3.5 h-3.5 text-[#8F9691] absolute left-3 top-2.5" />
          <input
            type="text"
            name="search"
            defaultValue={params.search || ""}
            placeholder="Search SKU or name..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D4CCC0] rounded-sm text-[#182522] focus:outline-none focus:ring-1 focus:ring-[#173B32]"
          />
        </form>
      </div>

      {/* Products Table */}
      <Card className="bg-white border border-[#E5DFD5] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F4ED] border-b border-[#E5DFD5] text-[#626A65] uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-3">Item</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Purity &amp; Metal</th>
                <th className="py-3 px-3">Net Wt</th>
                <th className="py-3 px-3">Price Mode</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE2]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#626A65]">
                    No product records found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                    {/* Item */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-10 bg-[#F4EFE6] rounded-xs shrink-0 overflow-hidden border border-[#E5DFD5]">
                          <Image
                            src={p.primary_media_url || "/placeholder-jewellery.svg"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/admin/products/${p.id}/edit`} className="font-medium text-[#182522] hover:text-[#173B32] block max-w-xs truncate">
                            {p.name}
                          </Link>
                          {p.category_name && (
                            <span className="text-[10px] text-[#626A65]">{p.category_name}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-2.5 px-3 font-mono font-medium text-[#182522]">
                      {p.sku}
                    </td>

                    {/* Metal / Purity */}
                    <td className="py-2.5 px-3 text-[#626A65]">
                      {p.metal_purity || "—"}
                    </td>

                    {/* Net Wt */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#182522]">
                      {p.net_gold_weight_grams ? `${p.net_gold_weight_grams}g` : "—"}
                    </td>

                    {/* Price Mode */}
                    <td className="py-2.5 px-3 text-[#626A65]">
                      {p.price_mode === "fixed_price" && p.fixed_price_amount ? (
                        <span className="font-medium text-[#182522]">₹{p.fixed_price_amount.toLocaleString("en-IN")}</span>
                      ) : (
                        <span className="capitalize">{p.price_mode.replace(/_/g, " ")}</span>
                      )}
                    </td>

                    {/* Status with Quick Toggle */}
                    <td className="py-2.5 px-3">
                      <StatusChangeDropdown productId={p.id} currentStatus={p.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-1.5 text-[#173B32] hover:bg-[#EEF3EE] rounded-xs transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        {p.status === "published" && (
                          <Link
                            href={`/jewellery/${p.slug}`}
                            target="_blank"
                            className="p-1.5 text-[#626A65] hover:text-[#182522] hover:bg-[#EAE4D7] rounded-xs transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
