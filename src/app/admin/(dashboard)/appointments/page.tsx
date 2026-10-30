import React from "react";
import { repo } from "@/lib/db/repo";
import { AppointmentsListView } from "@/components/admin/AppointmentsListView";

export const metadata = {
  title: "Appointments & Astrology Diary — Vaidik Ratnam Admin",
};

export default async function AdminAppointmentsPage() {
  const appointments = await repo.getAdminAppointments();
  return <AppointmentsListView initialAppointments={appointments} />;
}

