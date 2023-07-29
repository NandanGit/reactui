import React from 'react';
import {
  SwitchChildrenAppearance,
  SwitchSize,
  SwitchStatus,
  SwitchVariant,
  switchInteractionStates,
} from './Switch.types';
import { resolveDynamicStyles } from '../utils/resolveDynamicStyes';
import { resolveStaticStyles } from '../utils/resolveStaticStyles';
import clsx from 'clsx';

export interface SwitchToggleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Styles
  className?: string;
  style?: React.CSSProperties;
  appearance?: SwitchChildrenAppearance;

  // Static
  size: SwitchSize;
  status: SwitchStatus;
  variant: SwitchVariant;

  // Dynamic
  isHovered: boolean;
  isPressed: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
  isSelected: boolean;
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({
  children,

  className: userDefinedClassName = '',
  style: userDefinedStyle = {},
  appearance,

  size,
  status,
  variant,

  isPressed,
  isHovered,
  isFocusVisible,
  isDisabled,
  isSelected,

  ...props
}) => {
  const {
    size: sizeStyles,
    status: statusStyles,
    variant: variantStyles,
  } = resolveStaticStyles<{
    size: SwitchSize;
    status: SwitchStatus;
    variant: SwitchVariant;
  }>(appearance?.static, {
    size,
    status,
    variant,
  });

  const {
    disabled: disabledStyles,
    pressed: pressedStyles,
    hovered: hoveredStyles,
    focused: focusedStyles,
    selected: selectedStyles,
  } = resolveDynamicStyles(switchInteractionStates, appearance?.dynamic, {
    disabled: isDisabled,
    pressed: isPressed,
    focused: isFocusVisible,
    hovered: isHovered,
    selected: isSelected,
  });

  const className = clsx(
    userDefinedClassName,
    appearance?.self?.className,
    disabledStyles.className,
    pressedStyles.className,
    hoveredStyles.className,
    focusedStyles.className,
    sizeStyles.className,
    statusStyles.className,
    variantStyles.className,
    selectedStyles.className
  );

  const style = {
    ...appearance?.self?.style,
    ...sizeStyles.style,
    ...statusStyles.style,
    ...variantStyles.style,
    ...selectedStyles.style,
    ...hoveredStyles.style,
    ...focusedStyles.style,
    ...pressedStyles.style,
    ...disabledStyles.style,

    ...userDefinedStyle,
  };
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
};
