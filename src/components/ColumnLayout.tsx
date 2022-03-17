import _ from "lodash";
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { View } from "./View";

const S = StyleSheet.create({
  wrap: { flexDirection: "row" },
  childWrap: { flex: 1 },
});

export function ColumnLayout({
  numColumns = 1,
  children,
  columnSeparator,
  rowSeparator,
}: {
  numColumns?: number;
  children: React.ReactNode;
  columnSeparator?: React.ReactNode;
  rowSeparator?: React.ReactNode;
}) {
  const childrenList = React.Children.toArray(children);

  return (
    <View>
      {_.chunk(childrenList, numColumns).map((childrenGroup, row) => {
        return (
          <Fragment key={`row-${row}`}>
            {row > 0 && rowSeparator}

            <View style={S.wrap}>
              {childrenGroup.map((child, column) => {
                return (
                  <Fragment key={`row${row}:column${column}`}>
                    {column > 0 && columnSeparator}

                    <View style={S.childWrap}>{child}</View>
                  </Fragment>
                );
              })}

              {/* We insert a placeholder element to keep the items in the last row from stretching */}
              {Array.from({ length: numColumns - childrenGroup.length }).map(
                (_, index) => {
                  return (
                    <Fragment key={`placeholder-${index}`}>
                      {columnSeparator}
                      <View
                        style={{ flex: numColumns - childrenGroup.length }}
                      />
                    </Fragment>
                  );
                }
              )}
            </View>
          </Fragment>
        );
      })}
    </View>
  );
}
