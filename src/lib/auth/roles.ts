export type StaffRole = "owner" | "inventory_staff" | "consultant" | "content_editor" | "viewer";

export interface RolePermissions {
  canManageProducts: boolean;
  canManageMedia: boolean;
  canManageEnquiries: boolean;
  canManageCustomDesigns: boolean;
  canManageAppointments: boolean;
  canViewConfidentialNotes: boolean; // Birth details & consultation notes
  canManageQuotes: boolean;
  canManageArticles: boolean;
  canManageSettings: boolean;
  canViewAuditLogs: boolean;
}

export const ROLE_PERMISSIONS: Record<StaffRole, RolePermissions> = {
  owner: {
    canManageProducts: true,
    canManageMedia: true,
    canManageEnquiries: true,
    canManageCustomDesigns: true,
    canManageAppointments: true,
    canViewConfidentialNotes: true,
    canManageQuotes: true,
    canManageArticles: true,
    canManageSettings: true,
    canViewAuditLogs: true,
  },
  inventory_staff: {
    canManageProducts: true,
    canManageMedia: true,
    canManageEnquiries: false,
    canManageCustomDesigns: false,
    canManageAppointments: false,
    canViewConfidentialNotes: false,
    canManageQuotes: false,
    canManageArticles: false,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
  consultant: {
    canManageProducts: false,
    canManageMedia: false,
    canManageEnquiries: false,
    canManageCustomDesigns: false,
    canManageAppointments: true,
    canViewConfidentialNotes: true,
    canManageQuotes: false,
    canManageArticles: false,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
  content_editor: {
    canManageProducts: false,
    canManageMedia: true,
    canManageEnquiries: false,
    canManageCustomDesigns: false,
    canManageAppointments: false,
    canViewConfidentialNotes: false,
    canManageQuotes: false,
    canManageArticles: true,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
  viewer: {
    canManageProducts: false,
    canManageMedia: false,
    canManageEnquiries: false,
    canManageCustomDesigns: false,
    canManageAppointments: false,
    canViewConfidentialNotes: false,
    canManageQuotes: false,
    canManageArticles: false,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
};

export function hasPermission(role: StaffRole, permission: keyof RolePermissions): boolean {
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}

