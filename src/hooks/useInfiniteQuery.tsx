import _ from "lodash";
import { useRef, useState } from "react";
import {
  QueryFunction,
  useInfiniteQuery as RQuseInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { QueryKey } from "~/types/QueryKeys";
import { PaginatedResponse } from "~/types/Response";

export function useInfiniteQuery<
  TResult extends PaginatedResponse<TResource>,
  TError extends Error,
  TQueryKey extends QueryKey,
  TResource
>(
  key: TQueryKey,
  queryFn: QueryFunction<TResult, TQueryKey>,
  config?: UseInfiniteQueryOptions<TResult, TError, TResult, TResult, TQueryKey>
) {
  const query = RQuseInfiniteQuery(key, queryFn, config);

  // This will tell us where to render the error message
  // refetch - render in the header
  // fetchMore - render in the footer
  const errorSource = useRef<"refetch" | "fetchMore" | undefined>(undefined);
  const isFetchMoreError = query.isError && errorSource.current === "fetchMore";

  // react-query doesn't keep track of this so we have to do it ourselves
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async function onRefresh() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    errorSource.current = "refetch";
    await query.refetch().finally(() => {
      setIsRefreshing(false);
    });
  };

  const onEndReached =
    !query.isFetchingNextPage && query.hasNextPage && !isFetchMoreError
      ? () => {
          errorSource.current = "fetchMore";
          query.fetchNextPage();
        }
      : undefined;

  // Standard Laravel response
  // const dataList = _.flatMap(
  //   query.data?.pages,
  //   (response) => response.data
  // ) as TResult["data"];

  const dataList = _.flatMap(
    query.data?.pages,
    (response) => response.results
  ) as TResult["results"];

  const isEmpty = dataList.length === 0;

  return {
    ...query,
    isEmpty,
    isRefreshing,
    onRefresh,
    onEndReached,
    dataList,
    isFetchMoreError,
  };
}
