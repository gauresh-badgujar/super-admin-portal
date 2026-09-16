import { queryOptions } from "@tanstack/react-query";

import {
  getUserById,
  getUsers,
} from "../api/users.api";

import { userKeys } from "./queryKeys";

export const userQueries = {
  list: (filters: {
    search?: string;
    role?: string;
    status?: string;
    tenantId?: number;
    page?: number;
  }) =>
    queryOptions({
      queryKey: userKeys.list(filters),

      queryFn: ({ signal }) =>
        getUsers(filters, signal),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: userKeys.detail(id),

      queryFn: ({ signal }) =>
        getUserById(id, signal),

      enabled: !!id,
    }),
};