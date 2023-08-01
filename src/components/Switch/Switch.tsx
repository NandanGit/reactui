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
import clsx from 'clsx';

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

  // Icons
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  hideIcons?: boolean;
  iconContainerClassName?: string;
  iconContainerStyle?: React.CSSProperties;

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

  onIcon,
  offIcon,
  hideIcons = false,
  iconContainerClassName,
  iconContainerStyle = {},

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
    dataAttributes,
  } = useInteractionState({
    onHoverStart,
    onHoverEnd,
    isDisabled: !!props.isDisabled,
    isSelected: toggleState.isSelected,
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
      className={clsx(
        appearance?.container?.className,
        appearance?.self?.className,
        containerClassName,
        sizeStyles.className
      )}
      style={{
        ...sizeStyles.style,
        ...appearance?.container?.style,
        ...containerStyle,
      }}
      {...dataAttributes}
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
        <SwitchToggle
          style={{
            width: toggleWidth,
            height: toggleHeight,
            left: toggleState.isSelected
              ? indWidth - (toggleWidth + (indHeight - toggleHeight) / 2)
              : ((1 - tbs) / 2) * indHeight,
            overflow: 'clip',
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
          hideIcons={hideIcons || !onIcon}
        >
          <div
            className={clsx(
              'relative w-full h-full flex items-center justify-center',
              iconContainerClassName
            )}
            style={{ ...iconContainerStyle }}
          >
            {hideIcons ? null : toggleState.isSelected ? onIcon : offIcon}
          </div>
        </SwitchToggle>
      </SwitchIndicator>

      {showLabel && children}
    </label>
  );
};
