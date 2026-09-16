import { queryOptions } from "@tanstack/react-query";
import { getAnalytics } from "../api/analytics.api";
import { analyticsKeys } from "./queryKeys";

export const analyticsQueries = {
  dashboard: () =>
    queryOptions({
      queryKey: analyticsKeys.dashboard(),
      queryFn: ({ signal }) => getAnalytics(signal),
    }),
};