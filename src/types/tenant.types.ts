export type TenantStatus = "Active" | "Inactive";

export type TenantPlan = "Basic" | "Pro" | "Enterprise";

export interface Tenant {
  id: number;
  name: string;
  tenantId: string;
  plan: TenantPlan;
  userCount: number;
  status: TenantStatus;
  createdDate: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  subscriptionStatus: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
}

export interface TenantFilters {
  search: string;
  plan: string;
  status: string;
  page: number;
}

export interface TenantStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  revenue: number;
}

export interface TenantDetailsResponse extends Tenant {
  statistics: TenantStatistics;
}

export interface TenantUsersResponse {
  users: import("./user.types").User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TenantsResponse {
  tenants: Tenant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}