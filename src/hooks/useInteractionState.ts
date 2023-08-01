import {
  HoverProps,
  PressHookProps,
  useFocusRing,
  useHover,
  usePress,
} from 'react-aria';

type InteractionStateOptions = HoverProps &
  PressHookProps & {
    isSelected?: boolean;
  };

export const useInteractionState = ({
  // Hover
  onHoverStart,
  onHoverEnd,
  onHoverChange,

  // Press
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
  preventFocusOnPress,
  allowTextSelectionOnPress,
  shouldCancelOnPointerExit,

  // Common
  isDisabled,
  isSelected,
  ref,

  ...rest
}: InteractionStateOptions = {}) => {
  const { isFocusVisible, focusProps } = useFocusRing();

  const { hoverProps, isHovered } = useHover({
    onHoverStart,
    onHoverEnd,
    onHoverChange,
    isDisabled,
  });

  const { pressProps, isPressed } = usePress({
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    preventFocusOnPress,
    allowTextSelectionOnPress,
    shouldCancelOnPointerExit,
    isDisabled,
    isPressed: rest.isPressed,
  });

  const dataAttributes = {
    'data-selected': isSelected ? true : undefined,
    'data-disabled': isDisabled ? true : undefined,
    'data-hovered': isHovered ? true : undefined,
    'data-pressed': isPressed ? true : undefined,
    'data-focus-visible': isFocusVisible ? true : undefined,
  };

  return {
    isFocusVisible,
    focusProps,
    isHovered,
    hoverProps,
    isPressed,
    pressProps,
    dataAttributes,
  };
};
