import React from "react";
import { repo } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Security Audit Logs — Vaidik Ratnam Admin",
};

export default async function AdminAuditLogsPage() {
  const logs = await repo.getAuditLogs(100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#E5DFD5] pb-4">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
          Compliance &amp; Security
        </span>
        <h1 className="font-serif text-2xl text-[#182522] font-normal">
          Security &amp; Operations Audit Trail
        </h1>
        <p className="text-xs text-[#626A65] mt-0.5">
          Immutable log of all staff logins, product status updates, and quotation creations.
        </p>
      </div>

      <Card className="bg-white border border-[#E5DFD5] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F4ED] border-b border-[#E5DFD5] text-[#626A65] font-mono text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Staff Identity</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Entity Type</th>
                <th className="py-2.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE2]">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#626A65]">
                    No audit records recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id as string} className="hover:bg-[#F7F4ED]/50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#626A65]">
                      {new Date(log.created_at as string).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "medium",
                      })}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-[#182522]">
                      {String(log.staff_email || "system")}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#173B32]">
                      {String(log.action)}
                    </td>
                    <td className="py-2.5 px-3 capitalize text-[#626A65]">
                      {String(log.entity_type).replace(/_/g, " ")}
                    </td>
                    <td className="py-2.5 px-3 text-[#182522] text-[11px] max-w-md truncate">
                      {String(log.details || "—")}
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
