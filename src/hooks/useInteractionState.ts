import {
  HoverProps,
  PressHookProps,
  useFocusRing,
  useHover,
  usePress,
} from 'react-aria';

type InteractionStateOptions = HoverProps & PressHookProps;

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

  let { pressProps, isPressed } = usePress({
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

  return {
    isFocusVisible,
    focusProps,
    isHovered,
    hoverProps,
    isPressed,
    pressProps,
  };
};
