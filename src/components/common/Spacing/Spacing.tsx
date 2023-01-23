import React, {memo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

export type FlexSpacingSize = 1 | 2 | 3 | 4 | 8;

type SpacingProps = {
  height?: number;
  width?: number;
  flex?: FlexSpacingSize;
  style?: ViewStyle;
} & Omit<ViewProps, 'style'>;

const flexMixin = (flex: FlexSpacingSize) => ({flex});
const fixedMixin = (prop: 'width' | 'height', size?: number) => ({
  [prop]: size != null ? size : '100%',
});

/**
 * Usage:
 * <Spacing /> // height: 8; width: 100%;
 * <Spacing width={16}/> // width:16; height: 100%;
 * <Spacing flex={1} /> // flex: 1;
 */
export const Spacing = memo(
  ({width, height, flex, style, ...rest}: SpacingProps) => {
    const styles = [
      flex == null ? fixedMixin('width', width) : null,
      flex == null
        ? fixedMixin('height', width == null && height == null ? 8 : height)
        : null,
      flex != null && flexMixin(flex),
      style,
    ]
      .filter(Boolean)
      .reduce((a, b) => ({...a, ...b}), {});
    return (
      <View
        style={styles}
        accessibilityElementsHidden={true}
        importantForAccessibility="no"
        {...rest}
      />
    );
  },
);
