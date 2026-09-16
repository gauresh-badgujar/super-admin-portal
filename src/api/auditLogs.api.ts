import { apiGet } from "./api";
import type {
  AuditLog,
  AuditLogFilters,
  AuditLogsResponse,
  AuditLogDetailsResponse,
} from "../types/auditLog.types";

export async function getAuditLogs(
  filters: AuditLogFilters,
  signal?: AbortSignal
): Promise<AuditLogsResponse> {
  const page = filters.page || 1;
  const limit = 10;

  const skip = (page - 1) * limit;

  const response = await apiGet<{
    users: Array<{
      id: number;
      firstName: string;
      lastName: string;
    }>;
    total: number;
  }>(`/users?limit=${limit}&skip=${skip}`, signal);

  const auditLogs: AuditLog[] = response.users.map((user) => ({
    id: user.id,
    timestamp: new Date().toISOString(),
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    tenantId: 0,
    tenantName: "Demo Tenant",
    action: "View User",
    status: "Success",
    resource: "User",
    previousValue: null,
    newValue: null,
    result: "Success",
    errorDetails: null,
  }));

  return {
    auditLogs,
    total: response.total,
    page,
    limit,
    totalPages: Math.ceil(response.total / limit),
  };
}

export async function getAuditLogById(
  id: number,
  signal?: AbortSignal
): Promise<AuditLogDetailsResponse> {
  const user = await apiGet<{
    id: number;
    firstName: string;
    lastName: string;
  }>(`/users/${id}`, signal);

  return {
    id: user.id,
    timestamp: new Date().toISOString(),
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    tenantId: 0,
    tenantName: "Demo Tenant",
    action: "View User",
    status: "Success",
    resource: "User",
    previousValue: null,
    newValue: null,
    result: "Success",
    errorDetails: null,
  };
}