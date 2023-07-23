import React, { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import {
  ButtonSize,
  ButtonSizeToClassNameMap,
  ButtonSizeToStyleMap,
  ButtonStateToClassNameMap,
  ButtonStateToStyleMap,
} from './Button.types';
import { HoverEvent } from '../types';
import { useInteractionState } from '../../hooks/useInteractionState';

export interface ButtonProps extends AriaButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  // Size
  size?: ButtonSize;
  classNameBySize?: ButtonSizeToClassNameMap;
  styleBySize?: ButtonSizeToStyleMap;

  // State
  classNameByState?: ButtonStateToClassNameMap;
  styleByState?: ButtonStateToStyleMap;

  // Events
  onHover?: (e: HoverEvent) => void;
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,

  size = 'md',
  className: baseClassName = '',
  style: baseStyle = {},

  classNameBySize = {},
  styleBySize = {},

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

  const sizeClassName = classNameBySize[size] || '';
  const sizeStyle = styleBySize[size] || {};

  const pressedClassName = isPressed ? classNameByState['pressed'] : '';
  const pressedStyle = isPressed ? styleByState['pressed'] : {};

  const disabledClassName = props.isDisabled
    ? classNameByState['disabled']
    : '';
  const disabledStyle = props.isDisabled ? styleByState['disabled'] : {};

  const focusedClassName = isFocusVisible ? classNameByState['focused'] : '';
  const focusedStyle = isFocusVisible ? styleByState['focused'] : {};

  const hoveredClassName = isHovered ? classNameByState['hovered'] : '';
  const hoveredStyle = isHovered ? styleByState['hovered'] : {};

  return (
    <button
      className={`${baseClassName} ${sizeClassName} ${hoveredClassName} ${pressedClassName} ${disabledClassName} ${focusedClassName}`}
      style={{
        ...baseStyle,
        ...sizeStyle,
        ...hoveredStyle,
        ...pressedStyle,
        ...disabledStyle,
        ...focusedStyle,
      }}
      {...buttonProps}
      {...hoverProps}
      {...focusProps}
      ref={ref}
    >
      {/* {isHovered ? 'Hovered' : children} */}
      {children}
    </button>
  );
};
