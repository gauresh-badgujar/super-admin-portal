import { queryOptions } from "@tanstack/react-query";
import {
  getTenantById,
  getTenants,
} from "../api/tenants.api";
import { tenantKeys } from "./queryKeys";

export const tenantQueries = {
  list: (filters: {
    search?: string;
    plan?: string;
    status?: string;
    page?: number;
  }) =>
    queryOptions({
      queryKey: tenantKeys.list(filters),
      queryFn: ({ signal }) =>
        getTenants(filters, signal),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: tenantKeys.detail(id),
      queryFn: ({ signal }) =>
        getTenantById(id, signal),
      enabled: !!id,
    }),
};