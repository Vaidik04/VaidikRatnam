"use client";

import React, { useState } from "react";
import { Appointment } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  updateAppointmentStatusAction,
  getConfidentialNotesAction,
} from "@/app/admin/appointments/actions";
import { Lock, Check } from "lucide-react";

export function AppointmentsListView({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [confidentialData, setConfidentialData] = useState<Record<string, unknown> | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const handleOpenDetails = async (apt: Appointment) => {
    setSelectedApt(apt);
    setLoadingNotes(true);
    setConfidentialData(null);

    const res = await getConfidentialNotesAction(apt.id);
    if (res.success && res.data) {
      setConfidentialData(res.data);
    }
    setLoadingNotes(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedApt) return;
    const res = await updateAppointmentStatusAction(selectedApt.id, newStatus);
    if (res.success) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === selectedApt.id ? { ...a, status: newStatus } : a))
      );
      setSelectedApt((prev) => (prev ? { ...prev, status: newStatus } : null));
    } else {
      alert(res.message || "Failed to update status.");
    }
  };

  const filtered = appointments.filter((a) => {
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#E5DFD5] pb-4">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
          Studio Consultations &amp; Diary
        </span>
        <h1 className="font-serif text-2xl text-[#182522] font-normal">
          Astrology &amp; Viewing Appointments
        </h1>
        <p className="text-xs text-[#626A65] mt-0.5">
          Review appointment requests, confirm practitioner diary slots, and securely access protected birth details.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          type="button"
          onClick={() => setStatusFilter("")}
          className={`text-xs px-3 py-1.5 rounded-xs uppercase tracking-wider font-medium cursor-pointer ${
            !statusFilter ? "bg-[#173B32] text-white" : "bg-white text-[#182522] border border-[#E5DFD5]"
          }`}
        >
          All ({appointments.length})
        </button>
        {["pending_confirmation", "confirmed", "reschedule_requested", "completed", "cancelled"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`text-xs px-3 py-1.5 rounded-xs uppercase tracking-wider font-medium capitalize cursor-pointer ${
              statusFilter === st ? "bg-[#173B32] text-white" : "bg-white text-[#182522] border border-[#E5DFD5]"
            }`}
          >
            {st.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <Card className="p-10 text-center bg-white text-xs text-[#626A65]">
          No appointments found matching your filter.
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((apt) => (
            <Card
              key={apt.id}
              className="p-5 bg-white hover:border-[#173B32] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
              onClick={() => handleOpenDetails(apt)}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#173B32]">
                    {apt.reference_code}
                  </span>
                  <Badge variant={apt.status === "confirmed" ? "available" : apt.status === "pending_confirmation" ? "warning" : "draft"}>
                    {apt.status.replace(/_/g, " ")}
                  </Badge>
                  <span className="text-xs font-mono uppercase bg-[#F7F4ED] px-2 py-0.5 rounded-xs text-[#626A65]">
                    {apt.mode.replace(/_/g, " ")}
                  </span>
                </div>

                <h3 className="font-serif text-base text-[#182522] font-medium">
                  {apt.service_title}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-[#626A65]">
                  <span>Customer: <strong className="text-[#182522]">{apt.customer_name}</strong></span>
                  <span>Requested: <strong className="text-[#182522]">{apt.requested_date}</strong> ({apt.requested_time_slot.replace(/_/g, " ")})</span>
                  <span>Contact: <strong className="text-[#182522] capitalize">{apt.customer_contact_method}</strong> ({apt.customer_contact_value})</span>
                </div>
              </div>

              <div className="shrink-0">
                <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                  View Booking &amp; Notes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal with Protected Birth Details */}
      {selectedApt && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApt(null)}
          title={`Appointment ${selectedApt.reference_code}`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-xs">
            {/* Overview */}
            <div className="bg-[#F7F4ED] p-4 rounded-xs border border-[#E5DFD5] space-y-2">
              <div className="flex justify-between items-baseline">
                <strong className="text-sm font-serif text-[#182522]">{selectedApt.service_title}</strong>
                <Badge variant={selectedApt.status === "confirmed" ? "available" : "warning"}>
                  {selectedApt.status.replace(/_/g, " ")}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E5DFD5]">
                <div>
                  <span className="text-[#626A65] block">Customer:</span>
                  <strong className="text-[#182522]">{selectedApt.customer_name}</strong>
                </div>
                <div>
                  <span className="text-[#626A65] block">Contact ({selectedApt.customer_contact_method}):</span>
                  <strong className="text-[#182522] font-mono">{selectedApt.customer_contact_value}</strong>
                </div>
                <div>
                  <span className="text-[#626A65] block">Requested Date &amp; Slot:</span>
                  <strong className="text-[#182522]">{selectedApt.requested_date} ({selectedApt.requested_time_slot.replace(/_/g, " ")})</strong>
                </div>
                <div>
                  <span className="text-[#626A65] block">Mode:</span>
                  <strong className="text-[#182522] capitalize">{selectedApt.mode.replace(/_/g, " ")}</strong>
                </div>
              </div>
            </div>

            {/* Protected Confidential Birth Details */}
            <div className="bg-white border border-[#E5DFD5] rounded-xs p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
                <span className="font-serif text-sm font-semibold text-[#182522] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#B08D57]" />
                  Protected Horoscopic Birth Data
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#EEF3EE] px-2 py-0.5 rounded-xs text-[#173B32]">
                  Consultant Restricted
                </span>
              </div>

              {loadingNotes ? (
                <p className="text-xs text-[#626A65] py-2">Loading protected records...</p>
              ) : confidentialData ? (
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[#626A65] block">Birth Date:</span>
                      <strong className="text-[#182522]">{String(confidentialData.birth_date || "Not provided")}</strong>
                    </div>
                    <div>
                      <span className="text-[#626A65] block">Birth Time:</span>
                      <strong className="text-[#182522]">{String(confidentialData.birth_time || "Not provided")}</strong>
                    </div>
                    <div>
                      <span className="text-[#626A65] block">Birth Place:</span>
                      <strong className="text-[#182522]">{String(confidentialData.birth_place || "Not provided")}</strong>
                    </div>
                  </div>

                  {confidentialData.specific_questions ? (
                    <div className="pt-2 border-t border-[#F0ECE2]">
                      <span className="text-[#626A65] block mb-1">Focus Areas &amp; Client Consultation Notes:</span>
                      <div className="p-3 bg-[#F7F4ED] rounded-xs text-[#182522] whitespace-pre-line leading-relaxed font-sans text-xs">
                        {String(confidentialData.specific_questions)}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="text-xs text-[#626A65]">
                  No confidential birth details attached to this appointment.
                </p>
              )}
            </div>

            {/* Status Transition Actions */}
            <div className="pt-2 border-t border-[#E5DFD5] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#626A65]">Change Status:</span>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => handleStatusChange("confirmed")}
                  disabled={selectedApt.status === "confirmed"}
                  className="text-xs uppercase tracking-wider"
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Confirm Slot
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleStatusChange("reschedule_requested")}
                  className="text-xs uppercase tracking-wider"
                >
                  Reschedule
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("completed")}
                  className="text-xs uppercase tracking-wider"
                >
                  Completed
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedApt(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
