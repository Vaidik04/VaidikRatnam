import React from "react";
import Link from "next/link";
import { repo } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Inbox,
  Sparkles,
  Calendar,
  Package,
  Images,
  ShieldCheck,
  Clock,
  MessageCircle,
  AlertCircle,
  ArrowRight,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "Operations Dashboard — Vaidik Ratnam Admin",
};

export default async function AdminDashboardPage() {
  const [metrics, enquiries, customDesigns, appointments, auditLogs] = await Promise.all([
    repo.getDashboardMetrics(),
    repo.getAdminEnquiries(),
    repo.getAdminCustomDesigns(),
    repo.getAdminAppointments(),
    repo.getAuditLogs(6),
  ]);

  const todayStr = new Date().toISOString().split("T")[0];

  const followUpEnquiries = enquiries.filter(
    (e) => (e.status !== "closed_won" && e.status !== "closed_lost") && (
      (e.follow_up_due_date && e.follow_up_due_date <= todayStr) ||
      e.status === "new"
    )
  );

  const pendingCustomDesigns = customDesigns.filter((c) => c.status === "new" || c.status === "reviewing");
  const pendingAppointments = appointments.filter((a) => a.status === "pending_confirmation");
  const totalFollowUps = followUpEnquiries.length + pendingCustomDesigns.length + pendingAppointments.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
            Today&apos;s Work &bull; Operational Queue
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
            Business Operations Centre
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/media">
            <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
              <Images className="w-3.5 h-3.5 mr-1" />
              Upload Stock Photos
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button variant="primary" size="sm" className="text-xs uppercase tracking-wider font-semibold">
              <Package className="w-3.5 h-3.5 mr-1" />
              New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Priority Follow-Ups & Client Action Radar */}
      {totalFollowUps > 0 && (
        <div className="bg-white border-2 border-[#B08D57] rounded-xs shadow-md overflow-hidden">
          <div className="bg-[#173B32] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAB308] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EAB308]"></span>
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F3E5AB]" />
                <h2 className="font-serif text-base font-semibold tracking-wide text-white">
                  Client Follow-Ups &amp; Priority Actions Due Today
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#B08D57]/30 border border-[#B08D57]/60 text-[#F3E5AB] font-mono text-xs font-bold">
                {totalFollowUps} Action{totalFollowUps > 1 ? "s" : ""} Pending
              </span>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#E5DFD5]">
            {/* Col 1: Enquiries needing response or due today */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#925700] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Enquiries Due ({followUpEnquiries.length})
                </span>
                <Link href="/admin/enquiries" className="text-[11px] text-[#173B32] hover:text-[#B08D57] font-medium">
                  All &rarr;
                </Link>
              </div>

              {followUpEnquiries.length === 0 ? (
                <p className="text-xs text-[#8F9691] py-2">No enquiry follow-ups pending today.</p>
              ) : (
                <div className="space-y-2">
                  {followUpEnquiries.slice(0, 3).map((enq) => {
                    const rawDigits = enq.customer_contact_value.replace(/[^0-9]/g, "");
                    const isPhone = rawDigits.length >= 10;
                    return (
                      <div
                        key={enq.id}
                        className="p-3 bg-[#FAF8F5] border border-[#E5DFD5] rounded-xs text-xs space-y-1.5 hover:border-[#173B32] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#173B32]">{enq.reference_code}</span>
                          <span className="text-[10px] text-[#925700] font-mono font-semibold">
                            {enq.status === "new" ? "New" : enq.follow_up_due_date ? `Due ${enq.follow_up_due_date}` : "Follow-up"}
                          </span>
                        </div>
                        <p className="font-medium text-[#182522] truncate">{enq.customer_name}</p>
                        <p className="text-[#626A65] text-[11px] truncate">
                          {enq.product_name ? `Re: ${enq.product_name}` : enq.enquiry_type.replace(/_/g, " ")}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          {isPhone && (
                            <>
                              <a
                                href={`https://wa.me/${rawDigits.startsWith("91") ? rawDigits : `91${rawDigits}`}?text=${encodeURIComponent(`Namaste ${enq.customer_name}, following up regarding your enquiry (${enq.reference_code}) with Vaidik Ratnam Jewellery & Gemstone Shop.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-[#1B6442] hover:underline font-semibold"
                              >
                                <MessageCircle className="w-3 h-3" />
                                WhatsApp
                              </a>
                              <a
                                href={`tel:${rawDigits}`}
                                className="inline-flex items-center gap-1 text-[11px] text-[#626A65] hover:text-[#182522] hover:underline font-medium"
                              >
                                <Phone className="w-3 h-3" />
                                Call
                              </a>
                            </>
                          )}
                          <Link
                            href={`/admin/enquiries#${enq.id}`}
                            className="inline-flex items-center gap-0.5 text-[11px] text-[#173B32] hover:underline font-medium ml-auto"
                          >
                            <span>Open</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Col 2: Custom Design Briefs */}
            <div className="space-y-3 pt-4 lg:pt-0 lg:pl-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#173B32] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Custom Briefs ({pendingCustomDesigns.length})
                </span>
                <Link href="/admin/custom-designs" className="text-[11px] text-[#173B32] hover:text-[#B08D57] font-medium">
                  All &rarr;
                </Link>
              </div>

              {pendingCustomDesigns.length === 0 ? (
                <p className="text-xs text-[#8F9691] py-2">No custom briefs awaiting quotes.</p>
              ) : (
                <div className="space-y-2">
                  {pendingCustomDesigns.slice(0, 3).map((cd) => (
                    <Link
                      key={cd.id}
                      href={`/admin/custom-designs/${cd.id}`}
                      className="p-3 bg-[#FAF8F5] border border-[#E5DFD5] rounded-xs text-xs space-y-1 block hover:border-[#173B32] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#173B32]">{cd.reference_code}</span>
                        <Badge variant="quote">{cd.status}</Badge>
                      </div>
                      <p className="font-medium text-[#182522]">{cd.customer_name}</p>
                      <p className="text-[#626A65] text-[11px] truncate">
                        {cd.piece_type} &bull; Budget: {cd.budget_range.replace(/_/g, " ")}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Col 3: Pending Appointments */}
            <div className="space-y-3 pt-4 lg:pt-0 lg:pl-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A61C1C] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Consultations ({pendingAppointments.length})
                </span>
                <Link href="/admin/appointments" className="text-[11px] text-[#173B32] hover:text-[#B08D57] font-medium">
                  All &rarr;
                </Link>
              </div>

              {pendingAppointments.length === 0 ? (
                <p className="text-xs text-[#8F9691] py-2">No appointment bookings awaiting confirmation.</p>
              ) : (
                <div className="space-y-2">
                  {pendingAppointments.slice(0, 3).map((apt) => (
                    <Link
                      key={apt.id}
                      href={`/admin/appointments#${apt.id}`}
                      className="p-3 bg-[#FFF0F0]/40 border border-[#FFD0D0] rounded-xs text-xs space-y-1 block hover:border-[#A61C1C] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#173B32]">{apt.reference_code}</span>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                      <p className="font-medium text-[#182522]">{apt.customer_name}</p>
                      <p className="text-[#626A65] text-[11px]">
                        {apt.requested_date} ({apt.requested_time_slot}) &bull; {apt.mode.replace(/_/g, " ")}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actionable KPI Cards (Real Data Only) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* New Enquiries */}
        <Link href="/admin/enquiries">
          <Card className={`p-4 transition-all hover:border-[#173B32] ${
            metrics.newEnquiries > 0 ? "bg-[#FFF8E7] border-[#FFE5A3]" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#626A65]">
                New Enquiries
              </span>
              <Inbox className={`w-4 h-4 ${metrics.newEnquiries > 0 ? "text-[#925700]" : "text-[#8F9691]"}`} />
            </div>
            <div className="font-serif text-3xl font-bold text-[#182522]">
              {metrics.newEnquiries}
            </div>
            <span className="text-[11px] text-[#626A65] mt-1 block">
              {metrics.newEnquiries > 0 ? "Awaiting review & response" : "All caught up"}
            </span>
          </Card>
        </Link>

        {/* Custom Briefs */}
        <Link href="/admin/custom-designs">
          <Card className={`p-4 transition-all hover:border-[#173B32] ${
            metrics.pendingCustomDesigns > 0 ? "bg-[#EEF3EE] border-[#C5D5C4]" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#626A65]">
                Custom Briefs
              </span>
              <Sparkles className="w-4 h-4 text-[#173B32]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#182522]">
              {metrics.pendingCustomDesigns}
            </div>
            <span className="text-[11px] text-[#626A65] mt-1 block">
              In review / Feasibility stage
            </span>
          </Card>
        </Link>

        {/* Appointments Needing Confirmation */}
        <Link href="/admin/appointments">
          <Card className={`p-4 transition-all hover:border-[#173B32] ${
            metrics.pendingAppointments > 0 ? "bg-[#FFF0F0] border-[#FFD0D0]" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#626A65]">
                Appointments
              </span>
              <Calendar className="w-4 h-4 text-[#A61C1C]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#182522]">
              {metrics.pendingAppointments}
            </div>
            <span className="text-[11px] text-[#626A65] mt-1 block">
              Pending diary acceptance
            </span>
          </Card>
        </Link>

        {/* Unlinked Stock Photos */}
        <Link href="/admin/media?unlinked=true">
          <Card className="p-4 bg-white transition-all hover:border-[#173B32]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#626A65]">
                Unlinked Photos
              </span>
              <Images className="w-4 h-4 text-[#B08D57]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#182522]">
              {metrics.unlinkedMediaCount}
            </div>
            <span className="text-[11px] text-[#626A65] mt-1 block">
              Photos needing SKU link
            </span>
          </Card>
        </Link>
      </div>

      {/* Main Operational Queues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Pending Custom Design Briefs */}
        <Card className="p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
            <h2 className="font-serif text-lg text-[#182522] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#173B32]" />
              Active Custom Design Briefs
            </h2>
            <Link href="/admin/custom-designs" className="text-xs text-[#173B32] hover:text-[#B08D57] font-medium">
              View All ({customDesigns.length}) &rarr;
            </Link>
          </div>

          {pendingCustomDesigns.length === 0 ? (
            <p className="text-xs text-[#626A65] py-4 text-center">
              No pending custom design briefs awaiting review.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingCustomDesigns.slice(0, 4).map((cd) => (
                <Link
                  key={cd.id}
                  href={`/admin/custom-designs/${cd.id}`}
                  className="p-3.5 bg-[#F7F4ED] hover:bg-[#EEF3EE] rounded-sm border border-[#E5DFD5] flex items-center justify-between block transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#173B32]">{cd.reference_code}</span>
                      <span className="font-semibold text-[#182522]">{cd.customer_name}</span>
                    </div>
                    <p className="text-[#626A65] line-clamp-1">{cd.piece_type} &bull; Budget: {cd.budget_range.replace(/_/g, " ")}</p>
                  </div>
                  <Badge variant="quote">{cd.status}</Badge>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Right: Pending Appointment Requests */}
        <Card className="p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
            <h2 className="font-serif text-lg text-[#182522] font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#A61C1C]" />
              Pending Consultation Appointments
            </h2>
            <Link href="/admin/appointments" className="text-xs text-[#173B32] hover:text-[#B08D57] font-medium">
              View All ({appointments.length}) &rarr;
            </Link>
          </div>

          {pendingAppointments.length === 0 ? (
            <p className="text-xs text-[#626A65] py-4 text-center">
              No pending appointment requests awaiting confirmation.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingAppointments.slice(0, 4).map((apt) => (
                <Link
                  key={apt.id}
                  href={`/admin/appointments#${apt.id}`}
                  className="p-3.5 bg-[#FFF0F0]/50 hover:bg-[#FFF0F0] rounded-sm border border-[#FFD0D0] flex items-center justify-between block transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#173B32]">{apt.reference_code}</span>
                      <span className="font-semibold text-[#182522]">{apt.customer_name}</span>
                    </div>
                    <p className="text-[#626A65]">
                      Date: <strong className="text-[#182522]">{apt.requested_date}</strong> ({apt.mode.replace(/_/g, " ")})
                    </p>
                  </div>
                  <Badge variant="warning">{apt.status.replace(/_/g, " ")}</Badge>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Recent Security & Audit Logs */}
      <Card className="p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
          <h2 className="font-serif text-lg text-[#182522] font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#173B32]" />
            Recent Audit &amp; System Events
          </h2>
          <Link href="/admin/audit-logs" className="text-xs text-[#173B32] hover:text-[#B08D57] font-medium">
            Complete Audit Log &rarr;
          </Link>
        </div>

        {auditLogs.length === 0 ? (
          <p className="text-xs text-[#626A65]">No recent audit logs recorded.</p>
        ) : (
          <div className="divide-y divide-[#F0ECE2] text-xs">
            {auditLogs.map((log) => (
              <div key={log.id as string} className="py-2.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-mono font-medium text-[#182522]">{log.action as string}</span>
                  <p className="text-[#626A65] text-[11px]">{log.details as string}</p>
                </div>
                <div className="text-right text-[11px] text-[#8F9691] shrink-0">
                  <span>{new Date(log.created_at as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
