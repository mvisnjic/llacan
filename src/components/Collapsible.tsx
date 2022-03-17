import React, { useState, useRef, useEffect, useCallback } from "react";
import { Animated, View, StyleSheet } from "react-native";

const S = StyleSheet.create({
  inner: { position: "absolute", width: "100%" },
});

type CollapsibleProps = {
  children: React.ReactNode;
  collapsed: boolean;
  duration?: number;
};

export function Collapsible({
  children,
  collapsed,
  duration = 300,
}: CollapsibleProps) {
  const isOpen = !collapsed;
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const [animatedHeight] = useState(() => new Animated.Value(0));
  const innerViewHeight = useRef<number | undefined>(undefined);
  const prevAnimationFinished = useRef(true);

  const runHeightSync = useCallback(
    function runHeightSync() {
      Animated.timing(animatedHeight, {
        toValue: isOpenRef.current ? (innerViewHeight.current as number) : 0,
        duration,
        useNativeDriver: false,
      }).start(({ finished }) => {
        prevAnimationFinished.current = finished;
      });
    },
    [animatedHeight, duration]
  );

  useEffect(() => {
    runHeightSync();
  }, [isOpen, runHeightSync]);

  const onLayout = useCallback(
    function onLayout(e) {
      innerViewHeight.current = e.nativeEvent.layout.height;
      runHeightSync();
    },
    [runHeightSync]
  );

  const outerStyle = { height: animatedHeight, overflow: "hidden" as const };

  return (
    <Animated.View style={outerStyle} collapsable={false}>
      <View style={S.inner} onLayout={onLayout} collapsable={false}>
        {children}
      </View>
    </Animated.View>
  );
}
