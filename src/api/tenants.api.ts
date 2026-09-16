import { apiGet } from "./api";
import type {
  Tenant,
  TenantsResponse,
  TenantUsersResponse,
} from "../types/tenant.types";

interface TenantListParams {
  search?: string;
  plan?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getTenants(
  params: TenantListParams,
  signal?: AbortSignal
): Promise<TenantsResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  const skip = (page - 1) * limit;

  const response = await apiGet<{
    users: Tenant[];
    total: number;
  }>(`/users?limit=${limit}&skip=${skip}`, signal);

  return {
    tenants: response.users,
    total: response.total,
    page,
    limit,
    totalPages: Math.ceil(response.total / limit),
  };
}

export async function getTenantById(
  id: number,
  signal?: AbortSignal
): Promise<Tenant> {
  return apiGet<Tenant>(`/users/${id}`, signal);
}

export async function getTenantUsers(
  _tenantId: number,
  signal?: AbortSignal
): Promise<TenantUsersResponse> {
  const response = await apiGet<{
    users: TenantUsersResponse["users"];
    total: number;
  }>("/users?limit=10&skip=0", signal);

  return {
    users: response.users,
    total: response.total,
    page: 1,
    limit: 10,
    totalPages: Math.ceil(response.total / 10),
  };
}