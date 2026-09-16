import { queryOptions } from "@tanstack/react-query";
import {
  getAuditLogById,
  getAuditLogs,
} from "../api/auditLogs.api";
import { auditLogKeys } from "./queryKeys";

export const auditLogQueries = {
  list: (filters: {
    search?: string;
    userId?: number;
    tenantId?: number;
    action?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
  }) =>
    queryOptions({
      queryKey: auditLogKeys.list(filters),
      queryFn: ({ signal }) =>
        getAuditLogs(
          {
            search: filters.search ?? "",
            userId: filters.userId,
            tenantId: filters.tenantId,
            action: filters.action ?? "",
            status: filters.status ?? "",
            startDate: filters.startDate ?? "",
            endDate: filters.endDate ?? "",
            page: filters.page ?? 1,
          },
          signal
        ),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: auditLogKeys.detail(id),
      queryFn: ({ signal }) =>
        getAuditLogById(id, signal),
      enabled: !!id,
    }),
};