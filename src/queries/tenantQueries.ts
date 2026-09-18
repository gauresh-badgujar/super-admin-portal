import { queryOptions } from "@tanstack/react-query";

import {
  getTenants,
  createTenant,
  type Tenant,
} from "../api/tenants.api";

export const tenantKeys = {
  all: ["tenants"] as const,

  lists: () => [...tenantKeys.all, "list"] as const,

  list: () => [...tenantKeys.lists()] as const,
};

export const tenantQueries = {
  list: () =>
    queryOptions({
      queryKey: tenantKeys.list(),

      queryFn: ({ signal }) => getTenants(signal),
    }),
};

export interface CreateTenantInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  status: Tenant["status"];
}

export async function addTenant(
  tenant: CreateTenantInput
): Promise<Tenant> {
  return createTenant(tenant);
}