import { apiGet } from "./api";
import type { Analytics } from "../types/analytics.types";

interface UsersResponse {
  users: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  total: number;
}

export async function getAnalytics(
  signal?: AbortSignal
): Promise<Analytics> {
  const response = await apiGet<UsersResponse>(
    "/users?limit=100",
    signal
  );

  const totalUsers = response.total;

  return {
    totalUsers,
    activeUsers: totalUsers,
    inactiveUsers: 0,
    totalTenants: 0,
    activeTenants: 0,
    revenue: 0,
    recentActivity: [],
  };
}