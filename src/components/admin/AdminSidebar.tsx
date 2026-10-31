"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutStaff } from "@/app/admin/login/actions";
import { StaffSession } from "@/lib/auth/session";
import {
  LayoutDashboard,
  Images,
  Package,
  FileSpreadsheet,
  Sparkles,
  Inbox,
  Calendar,
  FileText,
  BookOpen,
  Settings,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

interface AdminSidebarProps {
  session: StaffSession;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/media", label: "Stock Image Library", icon: Images },
  { href: "/admin/products", label: "Products & Stock", icon: Package },
  { href: "/admin/products/import-csv", label: "CSV Import Tool", icon: FileSpreadsheet },
  { href: "/admin/custom-designs", label: "Custom Design Briefs", icon: Sparkles },
  { href: "/admin/enquiries", label: "Customer Enquiries", icon: Inbox },
  { href: "/admin/appointments", label: "Appointments & Astrologer", icon: Calendar },
  { href: "/admin/quotes", label: "Quotations Builder", icon: FileText },
  { href: "/admin/knowledge", label: "Knowledge CMS & FAQs", icon: BookOpen },
  { href: "/admin/settings", label: "Business Settings", icon: Settings },
  { href: "/admin/audit-logs", label: "Security Audit Logs", icon: History },
];

export function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#182522] text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-[#2A3834]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 text-white hover:text-[#D4AF37]"
            aria-label="Open sidebar"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="w-7 h-7 rounded-xs bg-[#0F3D2E] border border-[#D4AF37]/50 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
            <Image
              src="/images/brand/app-icon-emerald-256.png"
              alt="VR"
              width={28}
              height={28}
              className="w-full h-full object-cover rounded-xs"
            />
          </div>
          <span className="font-serif text-base font-medium tracking-wide">
            Vaidik Ratnam Operations
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase bg-[#173B32] px-2 py-0.5 rounded-xs text-[#D4AF37]">
          {session.role}
        </span>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#182522] text-[#DDE5DC] border-r border-[#2A3834] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#2A3834]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xs bg-[#0F3D2E] border border-[#D4AF37]/60 flex items-center justify-center p-0.5 shrink-0 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/images/brand/app-icon-emerald-256.png"
                alt="Vaidik Ratnam"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-xs"
              />
            </div>
            <div>
              <span className="font-serif text-base tracking-wider text-white font-medium block">
                VAIDIK RATNAM
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                Operations Centre
              </span>
            </div>
          </Link>
        </div>

        {/* Staff Profile Card */}
        <div className="p-4 border-b border-[#2A3834] bg-[#12201D] text-xs">
          <div className="flex items-center justify-between mb-1">
            <strong className="text-white truncate block max-w-[140px]">
              {session.fullName}
            </strong>
            <span className="text-[10px] font-mono uppercase bg-[#173B32] text-[#B08D57] px-1.5 py-0.5 rounded-xs">
              {session.role}
            </span>
          </div>
          <span className="text-[11px] text-[#7B8580] truncate block">
            {session.email}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xs text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#173B32] text-white font-semibold"
                    : "text-[#9DA8A2] hover:bg-[#1C2C28] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#B08D57]" : "text-[#7B8580]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#2A3834] space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-[#9DA8A2] hover:text-white py-1 px-2 rounded-xs hover:bg-[#1C2C28] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#B08D57]" />
              View Public Website
            </span>
          </Link>

          <form action={logoutStaff}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 py-1.5 px-2 text-[#A61C1C] hover:bg-[#2C1818] rounded-xs transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

