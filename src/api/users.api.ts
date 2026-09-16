import { apiGet } from "./api";
import type {
  User,
  UserActivity,
  UsersResponse,
} from "../types/user.types";

interface DummyJsonUsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserListParams {
  search?: string;
  role?: string;
  status?: string;
  tenantId?: number;
  page?: number;
  limit?: number;
}

export async function getUsers(
  params: UserListParams,
  signal?: AbortSignal
): Promise<UsersResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  const skip = (page - 1) * limit;

  const search = params.search?.trim() ?? "";

  const url = search
    ? `/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `/users?limit=${limit}&skip=${skip}`;

  const response = await apiGet<DummyJsonUsersResponse>(
    url,
    signal
  );

  return {
    users: response.users,
    total: response.total,
    page,
    limit,
    totalPages: Math.ceil(response.total / limit),
  };
}

export async function getUserById(
  id: number,
  signal?: AbortSignal
): Promise<User> {
  return apiGet<User>(`/users/${id}`, signal);
}

export async function getUserActivity(
  userId: number,
  signal?: AbortSignal
): Promise<UserActivity[]> {
  return apiGet<UserActivity[]>(
    `/users/${userId}/activity`,
    signal
  );
}