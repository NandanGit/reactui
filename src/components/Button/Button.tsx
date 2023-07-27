import React, { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import {
  ButtonSize,
  ButtonInteractionState,
  ButtonStatus,
  ButtonVariant,
} from './Button.types';
import { HoverEvent } from '../types';
import { useInteractionState } from '../../hooks/useInteractionState';
import { componentInteractionStates } from '../types/constants';
import { ComponentAppearance } from '../types/ComponentAppearance';
import { resolveStaticStyles } from '../utils/resolveStaticStyles';
import { resolveDynamicStyles } from '../utils/resolveDynamicStyes';

export interface ButtonProps extends AriaButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  // Static
  size?: ButtonSize;
  status?: ButtonStatus;
  variant?: ButtonVariant;

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

  // Static
  size = 'md',
  status = 'default',
  variant = 'filled',

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

  const {
    size: sizeStyles,
    status: statusStyles,
    variant: variantStyles,
  } = resolveStaticStyles<{
    size: ButtonSize;
    status: ButtonStatus;
    variant: ButtonVariant;
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
  } = resolveDynamicStyles(componentInteractionStates, appearance?.dynamic, {
    disabled: props.isDisabled || false,
    pressed: isPressed,
    focused: isFocusVisible,
    hovered: isHovered,
  });

  return (
    <button
      className={`${userDefinedClassName} ${sizeStyles.className} ${statusStyles.className} ${variantStyles.className} ${hoveredStyles.className} ${pressedStyles.className} ${disabledStyles.className} ${focusedStyles.className}`}
      style={{
        ...sizeStyles.style,
        ...statusStyles.style,
        ...variantStyles.style,
        ...hoveredStyles.style,
        ...pressedStyles.style,
        ...disabledStyles.style,
        ...focusedStyles.style,

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
