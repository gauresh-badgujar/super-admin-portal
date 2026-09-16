import type { UserActivity } from "./user.types";

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalTenants: number;
  activeTenants: number;
  revenue: number;
  recentActivity: UserActivity[];
}