/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, RefObject } from "react";
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  EmitterSubscription,
  KeyboardEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  ScreenRect,
} from "react-native";

/**
 * View that moves out of the way when the keyboard appears by automatically
 * adjusting its height, position, or bottom padding.
 */

type Props = ViewProps & {
  behavior: "height" | "padding" | "position";
  contentContainerStyle: StyleProp<ViewStyle>;
  enabled: boolean;
  keyboardVerticalOffset: number;
};

type State = {
  bottom: number;
};

export class KeyboardAvoidingView extends Component<Props, State> {
  viewRef: RefObject<View>;

  static defaultProps = {
    children: null,
    enabled: true,
    keyboardVerticalOffset: 0,
    style: undefined,
    contentContainerStyle: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.state = { bottom: 0 };
    this.viewRef = React.createRef();
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      this._subscriptions = [
        Keyboard.addListener("keyboardWillChangeFrame", this._onKeyboardChange),
      ];
    } else {
      this._subscriptions = [
        Keyboard.addListener("keyboardDidHide", this._onKeyboardHide),
        Keyboard.addListener("keyboardDidShow", this._onKeyboardChange),
      ];
    }
  }

  componentWillUnmount() {
    this._subscriptions.forEach((subscription) => {
      subscription.remove();
    });
  }

  _frame: LayoutRectangle | null = null;
  _subscriptions: EmitterSubscription[] = [];
  _initialFrameHeight = 0;

  _relativeKeyboardHeight = (keyboardFrame: ScreenRect) => {
    const frame = this._frame;
    if (!frame || !keyboardFrame) {
      return 0;
    }

    const keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;

    // Calculate the displacement needed for the view such that it
    // no longer overlaps with the keyboard
    return Math.max(frame.y + frame.height - keyboardY, 0);
  };

  _onKeyboardChange = (event: KeyboardEvent) => {
    if (event == null) {
      this.setState({ bottom: 0 });
      return;
    }

    const { duration, easing, endCoordinates } = event;
    const height = this._relativeKeyboardHeight(endCoordinates);

    if (this.state.bottom === height) {
      return;
    }

    if (duration && easing) {
      LayoutAnimation.configureNext({
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing] || "keyboard",
        },
      });
    }
    this.setState({ bottom: height });
  };

  _onKeyboardHide = () => {
    this.setState({ bottom: 0 });
  };

  _onLayout = (event: LayoutChangeEvent) => {
    this._frame = event.nativeEvent.layout;
    if (!this._initialFrameHeight) {
      // save the initial frame height, before the keyboard is visible
      this._initialFrameHeight = this._frame ? this._frame.height : 0;
    }
  };

  render() {
    const {
      behavior,
      children,
      contentContainerStyle,
      enabled,
      style,
      ...props
    } = this.props;
    const bottomHeight = enabled ? this.state.bottom : 0;

    switch (behavior) {
      case "height": {
        let heightStyle;
        if (this._frame != null && this.state.bottom > 0) {
          // Note that we only apply a height change when there is keyboard present,
          // i.e. this.state.bottom is greater than 0. If we remove that condition,
          // this.frame.height will never go back to its original value.
          // When height changes, we need to disable flex.
          heightStyle = {
            height: this._initialFrameHeight - bottomHeight,
            flex: 0,
          };
        }
        return (
          <View
            ref={this.viewRef}
            style={StyleSheet.flatten([style, heightStyle])}
            onLayout={this._onLayout}
            {...props}
          >
            {children}
          </View>
        );
      }
      case "position":
        return (
          <View
            ref={this.viewRef}
            style={style}
            onLayout={this._onLayout}
            {...props}
          >
            <View
              style={StyleSheet.flatten([
                contentContainerStyle,
                {
                  bottom: bottomHeight,
                },
              ])}
            >
              {children}
            </View>
          </View>
        );

      case "padding":
        return (
          <View
            ref={this.viewRef}
            style={StyleSheet.flatten([style, { paddingBottom: bottomHeight }])}
            onLayout={this._onLayout}
            {...props}
          >
            {children}
          </View>
        );

      default:
        return (
          <View
            ref={this.viewRef}
            onLayout={this._onLayout}
            style={style}
            {...props}
          >
            {children}
          </View>
        );
    }
  }
}
