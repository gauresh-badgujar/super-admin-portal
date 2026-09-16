export type AuditLogStatus = "Success" | "Failed";

export interface AuditLog {
  id: number;
  timestamp: string;
  userId: number;
  userName: string;
  tenantId: number;
  tenantName: string;
  action: string;
  status: AuditLogStatus;
  resource: string;
  previousValue: string | null;
  newValue: string | null;
  result: string;
  errorDetails: string | null;
}

export interface AuditLogFilters {
  search: string;
  userId?: number;
  tenantId?: number;
  action: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
}

export interface AuditLogsResponse {
  auditLogs: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuditLogDetailsResponse extends AuditLog {}