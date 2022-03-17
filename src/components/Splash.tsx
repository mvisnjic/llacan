import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { styleConstants } from "~/style/styleConstants";

const DISABLE_SPLASHSCREEN = __DEV__;

const useStyle = () => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      backgroundColor: styleConstants.colorBackgroundLight,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 250,
      height: 250,
    },
  });
};

export const Splash = ({ isReady }: { isReady: boolean }) => {
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);
  const S = useStyle();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const shouldRun = isImageLoaded && isReady;

    if (!shouldRun || DISABLE_SPLASHSCREEN) return;

    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 800,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    });
  }, [containerOpacity, imageOpacity, isImageLoaded, isReady]);

  if (!visible || DISABLE_SPLASHSCREEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[S.container, { opacity: containerOpacity }]}
    >
      <Animated.Image
        source={require("~/assets/splash.png")}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        style={[S.image, { opacity: imageOpacity }]}
        // resizeMode="cover"
      />
    </Animated.View>
  );
};
