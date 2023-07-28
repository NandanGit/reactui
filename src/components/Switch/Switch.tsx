import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  AriaSwitchProps,
  VisuallyHidden,
  useLabel,
  useSwitch,
} from 'react-aria';
import {
  SwitchAppearance,
  SwitchSize,
  SwitchStatus,
  SwitchVariant,
} from './Switch.types';
import { HoverEvent } from '../types';
import { useToggleState } from 'react-stately';
import { useInteractionState } from '../../hooks/useInteractionState';
import { SwitchIndicator } from './SwitchIndicator';
import { SwitchToggle } from './SwitchToggle';
import { resolveStaticStyles } from '../utils/resolveStaticStyles';

export interface SwitchProps extends AriaSwitchProps {
  // Styles
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  appearance?: SwitchAppearance;

  // Static
  size?: SwitchSize;
  status?: SwitchStatus;
  variant?: SwitchVariant;

  // Events
  onHover?: (e: HoverEvent) => void;
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;

  // Others
  label: string;
  showLabel?: boolean;
  toggleButtonSizeFraction?: number;
  toggleButtonWidthFraction?: number;
}

export const Switch: React.FC<SwitchProps> = ({
  children,

  className: userDefinedClassName = '',
  style: userDefinedStyle = {},
  containerClassName = '',
  containerStyle = {},
  appearance,

  size = 'md',
  status = 'success',
  variant = 'filled',

  onHoverStart,
  onHoverEnd,

  label,
  showLabel = false,
  toggleButtonSizeFraction: tbs = 0.7,
  toggleButtonWidthFraction: tbw = 1,

  ...props
}) => {
  const toggleState = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const modifiedProps = {
    ...props,
    'aria-labelledby': label,
  };
  const { inputProps } = useSwitch(modifiedProps, toggleState, ref);
  const { labelProps, fieldProps } = useLabel(modifiedProps);

  const [
    { width: indWidth, height: indHeight },
    setIndicatorDimensions,
  ] = useState({
    width: 0,
    height: 0,
  });

  const {
    isFocusVisible,
    focusProps,
    hoverProps,
    isHovered,
    isPressed,
  } = useInteractionState({
    onHoverStart,
    onHoverEnd,
  });

  useLayoutEffect(() => {
    if (indicatorRef.current) {
      const { width, height } = indicatorRef.current.getBoundingClientRect();
      setIndicatorDimensions({ width, height });
    }
  }, []);

  const { size: sizeStyles } = resolveStaticStyles<{
    size: SwitchSize;
  }>(appearance?.static, {
    size,
  });

  const toggleWidth = tbs * tbw * indHeight;
  const toggleHeight = tbs * indHeight;

  return (
    <label
      {...labelProps}
      {...hoverProps}
      aria-labelledby={label}
      className={`${appearance?.container?.className || ''} ${appearance?.self
        ?.className || ''} ${containerClassName || ''} ${sizeStyles.className}`}
      style={{
        ...sizeStyles.style,
        ...appearance?.container?.style,
        ...containerStyle,
      }}
      data-disabled={props.isDisabled ? true : undefined}
      data-selected={toggleState.isSelected ? true : undefined}
      data-pressed={isPressed ? true : undefined}
      data-hovered={isHovered ? true : undefined}
      data-focus-visible={isFocusVisible ? true : undefined}
    >
      <VisuallyHidden>
        <input {...inputProps} {...fieldProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <SwitchIndicator
        {...{
          isPressed,
          isHovered,
          isFocusVisible,
          isDisabled: !!props.isDisabled,
          isSelected: toggleState.isSelected,
        }}
        {...{ size, status, variant }}
        appearance={appearance?.childrenAppearances?.indicator}
        // ref={indicatorRef}
        className={`${userDefinedClassName}`}
        style={{
          ...userDefinedStyle,
        }}
        ref={indicatorRef}
      >
        {/* <div ref={indicatorRef}></div> */}
        <SwitchToggle
          style={{
            // marginLeft: toggleState.isSelected ? 'auto' : '0',
            width: toggleWidth,
            height: toggleHeight,
            left: toggleState.isSelected
              ? // ? indWidth - (indHeight * (1 + tbs)) / 2
                indWidth - (toggleWidth + (indHeight - toggleHeight) / 2)
              : ((1 - tbs) / 2) * indHeight,
          }}
          {...{
            isPressed,
            isHovered,
            isFocusVisible,
            isDisabled: !!props.isDisabled,
            isSelected: toggleState.isSelected,
          }}
          {...{ size, status, variant }}
          appearance={appearance?.childrenAppearances?.toggle}
        />
      </SwitchIndicator>

      {showLabel && children}
    </label>
  );
};
