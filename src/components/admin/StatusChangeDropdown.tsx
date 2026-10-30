"use client";

import React, { useState } from "react";
import { updateProductStatusAction } from "@/app/admin/products/actions";
import { Product } from "@/lib/db/repo";

export function StatusChangeDropdown({
  productId,
  currentStatus,
}: {
  productId: string;
  currentStatus: Product["status"];
}) {
  const [status, setStatus] = useState<Product["status"]>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Product["status"];
    setIsUpdating(true);
    setStatus(newStatus);

    const res = await updateProductStatusAction(productId, newStatus);
    if (!res.success) {
      alert(res.message || "Failed to update status.");
      setStatus(currentStatus); // Revert
    }
    setIsUpdating(false);
  };

  const getBadgeColor = (st: Product["status"]) => {
    switch (st) {
      case "published":
        return "bg-[#EEF3EE] text-[#173B32] border-[#C5D5C4]";
      case "draft":
        return "bg-[#F7F4ED] text-[#626A65] border-[#E5DFD5]";
      case "reserved":
        return "bg-[#FFF8E7] text-[#925700] border-[#FFE5A3]";
      case "sold":
        return "bg-[#F0ECE2] text-[#182522] border-[#D4CCC0]";
      case "archived":
        return "bg-[#FFF0F0] text-[#A61C1C] border-[#FFD0D0]";
      default:
        return "bg-white text-[#626A65] border-[#E5DFD5]";
    }
  };

  return (
    <select
      value={status}
      disabled={isUpdating}
      onChange={handleChange}
      className={`text-[11px] font-medium uppercase px-2 py-1 rounded-xs border cursor-pointer focus:outline-none transition-colors ${getBadgeColor(
        status
      )}`}
    >
      <option value="published">Published</option>
      <option value="draft">Draft</option>
      <option value="incomplete">Incomplete</option>
      <option value="reserved">Reserved</option>
      <option value="sold">Sold</option>
      <option value="archived">Archived</option>
    </select>
  );
}

