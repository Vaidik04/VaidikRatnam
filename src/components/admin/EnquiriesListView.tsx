"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Enquiry } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select, Textarea, Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { updateEnquiryAdminAction } from "@/app/admin/enquiries/actions";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { Search } from "lucide-react";

export function EnquiriesListView({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Edit State in Modal
  const [status, setStatus] = useState("new");
  const [internalNotes, setInternalNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const openModal = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setStatus(enq.status);
    setInternalNotes(enq.internal_notes || "");
    setFollowUpDate(enq.follow_up_due_date || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    const res = await updateEnquiryAdminAction(selectedEnquiry.id, status, internalNotes, followUpDate);
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === selectedEnquiry.id
            ? { ...item, status, internal_notes: internalNotes, follow_up_due_date: followUpDate }
            : item
        )
      );
      setSelectedEnquiry(null);
    } else {
      alert(res.message || "Failed to update enquiry.");
    }
    setIsUpdating(false);
  };

  const filtered = enquiries.filter((e) => {
    if (filterType && e.enquiry_type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        e.customer_name.toLowerCase().includes(q) ||
        e.reference_code.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q)
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
            Client Inquiries Pipeline
          </span>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            Customer Enquiries &amp; Shop Visits
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Manage quote requests, stock checks, and scheduled shop visits.
          </p>
        </div>

        <div>
          <ExportCsvButton
            data={enquiries as unknown as Record<string, unknown>[]}
            filename="vaidik_ratnam_customer_enquiries"
            label="Export Enquiries CSV"
          />
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-[#E5DFD5] rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8F9691] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search reference, name..."
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
            <option value="">All Enquiry Types</option>
            <option value="quote_request">Quote Requests</option>
            <option value="showroom_viewing">Shop Visits</option>
            <option value="availability_check">Availability Checks</option>
            <option value="general_question">General Questions</option>
          </select>
        </div>

        <span className="text-xs text-[#626A65] font-mono">
          {filtered.length} enquiries
        </span>
      </div>

      {/* Enquiries List */}
      {filtered.length === 0 ? (
        <Card className="p-10 text-center bg-white text-xs text-[#626A65]">
          No customer enquiries found matching your filter.
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((enq) => (
            <Card
              key={enq.id}
              className="p-5 bg-white hover:border-[#173B32] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
              onClick={() => openModal(enq)}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#173B32]">
                    {enq.reference_code}
                  </span>
                  <Badge variant={enq.status === "new" ? "warning" : "available"}>
                    {enq.status.replace(/_/g, " ")}
                  </Badge>
                  <span className="text-xs font-mono uppercase bg-[#F7F4ED] px-2 py-0.5 rounded-xs text-[#626A65]">
                    {enq.enquiry_type.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-[#8F9691]">
                    {new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <strong className="text-[#182522]">{enq.customer_name}</strong>
                  <span className="text-[#626A65]">via {enq.customer_contact_method} ({enq.customer_contact_value})</span>
                </div>

                <p className="text-xs text-[#626A65] line-clamp-2 leading-relaxed">
                  {enq.message}
                </p>

                {enq.product_name && (
                  <p className="text-[11px] text-[#173B32] font-medium">
                    Item referenced: {enq.product_name} ({enq.product_sku})
                  </p>
                )}
              </div>

              <div className="shrink-0">
                <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                  Manage Enquiry
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for Managing Enquiry */}
      {selectedEnquiry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry ${selectedEnquiry.reference_code}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="bg-[#F7F4ED] p-4 rounded-xs border border-[#E5DFD5] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#182522] text-sm">{selectedEnquiry.customer_name}</span>
                <span className="font-mono capitalize text-[#B08D57]">{selectedEnquiry.customer_contact_method}: {selectedEnquiry.customer_contact_value}</span>
              </div>
              <p className="text-[#182522] leading-relaxed pt-1 border-t border-[#E5DFD5]">
                &ldquo;{selectedEnquiry.message}&rdquo;
              </p>
              {selectedEnquiry.preferred_viewing_date && (
                <div className="text-[#173B32] font-medium pt-1">
                  Requested Viewing Date: {selectedEnquiry.preferred_viewing_date}
                </div>
              )}
            </div>

            <Select
              label="Update Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "new", label: "New (Unread)" },
                { value: "reviewing", label: "Reviewing (Stock Check)" },
                { value: "needs_information", label: "Needs Customer Information" },
                { value: "viewing_scheduled", label: "Shop Visit Scheduled" },
                { value: "quote_sent", label: "Quote Sent to Customer" },
                { value: "confirmed", label: "Confirmed / Completed" },
                { value: "closed", label: "Closed" },
                { value: "lost", label: "Lost / Abandoned" },
              ]}
            />

            <Input
              label="Follow-Up Due Date (Optional)"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />

            <Textarea
              label="Internal Staff Follow-up Notes"
              rows={3}
              placeholder="e.g. Spoke on phone, confirmed kada size 2.6 in shop stock..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />

            <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between">
              <Link href={`/admin/quotes/new?enquiryId=${selectedEnquiry.id}&customerName=${encodeURIComponent(selectedEnquiry.customer_name)}&customerContact=${encodeURIComponent(selectedEnquiry.customer_contact_value)}`}>
                <Button type="button" variant="gold" size="sm" className="text-xs uppercase tracking-wider">
                  Draft Quotation &rarr;
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedEnquiry(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" isLoading={isUpdating} className="text-xs uppercase tracking-wider">
                  Update Enquiry Record
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
