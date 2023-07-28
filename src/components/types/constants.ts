export const componentSizes = ['sm', 'md', 'lg'] as const;
export const extendedComponentSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const componentInteractionStates = [
  // 'default',
  'hovered',
  'focused',
  'pressed',
  'disabled',
] as const;

export const componentStatuses = [
  'default',
  'success',
  'warning',
  'danger',
  'info',

  // 'primary',
  // 'secondary',
] as const;
