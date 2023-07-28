import React, { forwardRef } from 'react';
import {
  SwitchChildrenAppearance,
  SwitchSize,
  SwitchStatus,
  SwitchVariant,
  switchInteractionStates,
} from './Switch.types';
import { resolveDynamicStyles } from '../utils/resolveDynamicStyes';
import { resolveStaticStyles } from '../utils/resolveStaticStyles';

export interface SwitchIndicatorProps
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

export const SwitchIndicator = forwardRef<HTMLDivElement, SwitchIndicatorProps>(
  (
    {
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
    },
    ref
  ) => {
    const {
      // size: sizeStyles,
      status: statusStyles,
      variant: variantStyles,
    } = resolveStaticStyles<{
      // size: SwitchSize;
      status: SwitchStatus;
      variant: SwitchVariant;
    }>(appearance?.static, {
      // size,
      status: isSelected ? status : 'default',
      variant,
    });

    const {
      disabled: disabledStyles,
      pressed: pressedStyles,
      hovered: hoveredStyles,
      focused: focusedStyles,
    } = resolveDynamicStyles(switchInteractionStates, appearance?.dynamic, {
      disabled: isDisabled,
      pressed: isPressed,
      focused: isFocusVisible,
      hovered: isHovered,
      selected: isSelected,
    });

    const className = ` ${userDefinedClassName} ${appearance?.self?.className ||
      ''} ${disabledStyles.className} ${pressedStyles.className} ${
      hoveredStyles.className
    } ${focusedStyles.className} ${statusStyles.className} ${
      variantStyles.className
    }
  `;

    const style = {
      ...appearance?.self?.style,
      // ...sizeStyles.style,
      ...statusStyles.style,
      ...variantStyles.style,
      ...hoveredStyles.style,
      ...focusedStyles.style,
      ...pressedStyles.style,
      ...disabledStyles.style,

      ...userDefinedStyle,
    };
    return (
      <div className={className} style={style} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);
