/**
 * paginated.ts
 * @author soltia48
 * @date 2021-07-23
 */

import { AxiosInstance } from "axios";
import { NextApiRequestQuery } from "next/dist/server/api-utils";

export interface GetPaginatedOptions {
  start?: number;
  limit?: number;
  ordering?: string;
  q?: string;
}

export const getPaginated = async <T>(
  axiosInstance: AxiosInstance,
  uri: string,
  options: GetPaginatedOptions | NextApiRequestQuery
) => {
  const params: GetPaginatedOptions = {};
  if (typeof options.start === "number") {
    params.start = options.start;
  } else if (typeof options.start === "string") {
    params.start = parseInt(options.start);
  }
  if (typeof options.limit === "number") {
    params.limit = options.limit;
  } else if (typeof options.limit === "string") {
    params.limit = parseInt(options.limit);
  }
  if (typeof options.ordering === "string") {
    params.ordering = options.ordering;
  }
  if (typeof options.q === "string") {
    params.q = options.q;
  }
  return axiosInstance.get<T>(uri, {
    params,
  });
};
