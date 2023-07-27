import React, { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import {
  ButtonSize,
  ButtonSizeToClassNameMap,
  ButtonSizeToStyleMap,
  ButtonInteractionState,
  ButtonStatus,
  ButtonStatusToClassNameMap,
  ButtonStatusToStyleMap,
  ButtonVariant,
  ButtonVariantToClassNameMap,
  ButtonVariantToStyleMap,
} from './Button.types';
import { HoverEvent } from '../types';
import { useInteractionState } from '../../hooks/useInteractionState';
import { resolveStyles } from '../utils/resolveStyles';
import { componentInteractionStates } from '../types/constants';
import { resolveRadioStyles } from '../utils/resolveRadioStyles';
import { ComponentAppearance } from '../types/ComponentAppearance';

export interface ButtonProps extends AriaButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  // Size
  size?: ButtonSize;
  classNameBySize?: ButtonSizeToClassNameMap;
  styleBySize?: ButtonSizeToStyleMap;

  // Status
  status?: ButtonStatus;
  classNameByStatus?: ButtonStatusToClassNameMap;
  styleByStatus?: ButtonStatusToStyleMap;

  // Variant
  variant?: ButtonVariant;
  classNameByVariant?: ButtonVariantToClassNameMap;
  styleByVariant?: ButtonVariantToStyleMap;

  // Events
  onHover?: (e: HoverEvent) => void;
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;

  // Experiment
  appearance?: ComponentAppearance<
    {
      size: ButtonSize;
      status: ButtonStatus;
      variant: ButtonVariant;
    },
    ButtonInteractionState
  >;
}

export const Button: React.FC<ButtonProps> = ({
  children,

  className: userDefinedClassName = '',
  style: userDefinedStyle = {},

  size = 'md',
  // classNameBySize = {},
  styleBySize = {},

  status = 'default',
  classNameByStatus = {},
  styleByStatus = {},

  variant = 'filled',
  classNameByVariant = {},
  styleByVariant = {},

  onHoverStart,
  onHoverEnd,

  // Experiment
  appearance,
  // End Experiment

  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(props, ref);

  const {
    isFocusVisible,
    focusProps,
    hoverProps,
    isHovered,
  } = useInteractionState({
    onHoverStart,
    onHoverEnd,
  });

  // Static Appearance
  const staticClassNameMaps = appearance?.static.classNameMaps || {};
  const staticStyleMaps = appearance?.static.styleMaps || {};

  const {
    size: sizeStyles,
    status: statusStyles,
    variant: variantStyles,
  } = resolveRadioStyles<{
    size: ButtonSize;
    status: ButtonStatus;
    variant: ButtonVariant;
  }>({
    size: [size, staticClassNameMaps.size, staticStyleMaps.size],
    status: [status, classNameByStatus, styleByStatus],
    variant: [variant, classNameByVariant, styleByVariant],
  });

  const { disabled, pressed, hovered, focused } = resolveStyles(
    componentInteractionStates,
    appearance?.dynamic.classNameMap || {},
    appearance?.dynamic.styleMap || {},
    {
      disabled: props.isDisabled || false,
      pressed: isPressed,
      focused: isFocusVisible,
      hovered: isHovered,
    }
  );

  return (
    <button
      className={`${userDefinedClassName} ${sizeStyles.className} ${statusStyles.className} ${variantStyles.className} ${hovered.className} ${pressed.className} ${disabled.className} ${focused.className}`}
      style={{
        ...sizeStyles.style,
        ...statusStyles.style,
        ...variantStyles.style,
        ...hovered.style,
        ...pressed.style,
        ...disabled.style,
        ...focused.style,

        ...userDefinedStyle,
      }}
      {...buttonProps}
      {...hoverProps}
      {...focusProps}
      ref={ref}
    >
      {children}
    </button>
  );
};
