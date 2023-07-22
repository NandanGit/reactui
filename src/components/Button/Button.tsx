import React, { useRef } from 'react';
import { AriaButtonProps, useButton, useFocusRing } from 'react-aria';
import {
  ButtonSize,
  ButtonSizeToClassNameMap,
  ButtonSizeToStyleMap,
  ButtonStateToClassNameMap,
  ButtonStateToStyleMap,
} from './Button.types';

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

  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(props, ref);

  const { isFocusVisible, focusProps } = useFocusRing();

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

  return (
    <button
      className={`${baseClassName} ${sizeClassName} ${pressedClassName} ${disabledClassName} ${focusedClassName}`}
      style={{
        ...baseStyle,
        ...sizeStyle,
        ...pressedStyle,
        ...disabledStyle,
        ...focusedStyle,
      }}
      {...buttonProps}
      {...focusProps}
      ref={ref}
    >
      {children}
    </button>
  );
};
