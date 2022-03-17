import { observer } from "mobx-react";
import React from "react";
import { FlatList, FlatListProps, ListRenderItem } from "react-native";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";

type StandardFlatListProps<ItemT> = Omit<FlatListProps<ItemT>, "data"> & {
  query: {
    dataList: ItemT[];
    isRefetchError: boolean;
    onRefresh: () => void;
    error: any;
    onEndReached: undefined | (() => void);
    isRefreshing: boolean;
    isError: boolean;
    isFetchMoreError: boolean;
    refetch: () => any;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => any;
  };
  data?: ItemT[];
  renderItem: ListRenderItem<ItemT>;
  keyExtractor: Exclude<FlatListProps<ItemT>["keyExtractor"], null | undefined>;
  errorMessageTitle?: string;
  errorMessageSubtitle?: string;
  refetchErrorMessageTitle?: string;
  refetchErrorMessageSubtitle?: string;
  fetchMoreErrorMessageTitle?: string;
  fetchMoreErrorMessageSubtitle?: string;
  listEmptyMessage?: string;
};
export const StandardFlatList = observer(function StandardFlatList<T>({
  query,
  errorMessageTitle = "Something went wrong",
  errorMessageSubtitle = "Tap here or pull down to retry",
  refetchErrorMessageTitle = "Something went wrong",
  refetchErrorMessageSubtitle = "Tap here or pull down to retry",
  fetchMoreErrorMessageTitle = "Something went wrong",
  fetchMoreErrorMessageSubtitle = "Try again later",
  listEmptyMessage = "Nothing here. Try refreshing",
  ...props
}: StandardFlatListProps<T>) {
  return (
    <FlatList
      data={query.dataList}
      ListHeaderComponent={
        query.isRefetchError ? (
          <View centerContent paddingExtraLarge>
            <Text>{refetchErrorMessageTitle}</Text>
            <Text onPress={query.onRefresh} colorTheme>
              {refetchErrorMessageSubtitle}
            </Text>
            <Text sizeSmall>{String(query.error)}</Text>
          </View>
        ) : undefined
      }
      ItemSeparatorComponent={() => <Spacer />}
      onEndReachedThreshold={0.15}
      onEndReached={query.onEndReached}
      onRefresh={query.onRefresh}
      refreshing={query.isRefreshing}
      ListEmptyComponent={
        query.isError && !query.isFetchMoreError && !query.isRefetchError ? (
          <View>
            <View centerContent paddingExtraLarge>
              <Text>{errorMessageTitle}</Text>
              <Text sizeSmall>{String(query.error)}</Text>
              <Text colorAccent onPress={() => query.refetch()}>
                {errorMessageSubtitle}
              </Text>
            </View>
          </View>
        ) : query.isLoading ? (
          <View centerContent paddingExtraLarge>
            <Spinner />
          </View>
        ) : (
          <View centerContent paddingExtraLarge>
            <Text>{listEmptyMessage}</Text>
          </View>
        )
      }
      ListFooterComponent={
        query.isFetchingNextPage ? (
          <View paddingMedium>
            <Spinner />
          </View>
        ) : query.isFetchMoreError ? (
          <View centerContent paddingExtraLarge>
            <Text>{fetchMoreErrorMessageTitle}</Text>
            <Text sizeSmall>{String(query.error)}</Text>
            <Text onPress={() => query.fetchNextPage()} colorTheme>
              {fetchMoreErrorMessageSubtitle}
            </Text>
          </View>
        ) : undefined
      }
      {...props}
    />
  );
});
