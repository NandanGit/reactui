import React, { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import {
  ButtonSize,
  ButtonSizeToClassNameMap,
  ButtonSizeToStyleMap,
  ButtonStateToClassNameMap,
  ButtonStateToStyleMap,
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

  // InteractionState
  classNameByState?: ButtonStateToClassNameMap;
  styleByState?: ButtonStateToStyleMap;

  // Events
  onHover?: (e: HoverEvent) => void;
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,

  className: userDefinedClassName = '',
  style: userDefinedStyle = {},

  size = 'md',
  classNameBySize = {},
  styleBySize = {},

  status = 'default',
  classNameByStatus = {},
  styleByStatus = {},

  variant = 'filled',
  classNameByVariant = {},
  styleByVariant = {},

  classNameByState = {},
  styleByState = {},

  onHoverStart,
  onHoverEnd,

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

  const sizeClassName = `rui-size-${size} ${classNameBySize[size] || ''}`;
  const sizeStyle = styleBySize[size] || {};

  const statusClassName = `rui-status-${status} ${classNameByStatus[status] ||
    ''}`;
  const statusStyle = styleByStatus[status] || {};

  const variantClassName = `rui-variant-${variant} ${classNameByVariant[
    variant
  ] || ''}`;
  const variantStyle = styleByVariant[variant] || {};

  const { disabled, pressed, hovered, focused } = resolveStyles(
    componentInteractionStates,
    classNameByState,
    styleByState,
    {
      disabled: props.isDisabled || false,
      pressed: isPressed,
      focused: isFocusVisible,
      hovered: isHovered,
    }
  );

  return (
    <button
      className={`${userDefinedClassName} ${sizeClassName} ${statusClassName} ${variantClassName} ${hovered.className} ${pressed.className} ${disabled.className} ${focused.className}`}
      style={{
        ...sizeStyle,
        ...statusStyle,
        ...variantStyle,
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
