import { ComponentAppearance } from '../Appearances';
import { ComponentSize, ComponentStatus } from '../types';
import { componentInteractionStates } from '../types/constants';

export type SwitchSize = ComponentSize;
export type SwitchStatus = ComponentStatus | 'primary' | 'secondary';
export type SwitchVariant = 'filled' | 'outline';

export const switchInteractionStates = [
  ...componentInteractionStates,
  'selected',
] as const;
export type SwitchInteractionState = typeof switchInteractionStates[number];

export interface SwitchAppearance
  extends ComponentAppearance<
    {
      size: SwitchSize;
      status: SwitchStatus;
      variant: SwitchVariant;
    },
    SwitchInteractionState,
    {
      indicator: SwitchChildrenAppearance;
      toggle: SwitchChildrenAppearance;
    }
  > {}

export type SwitchChildrenAppearance = ComponentAppearance<
  {
    size: SwitchSize;
    status: SwitchStatus;
    variant: SwitchVariant;
  },
  SwitchInteractionState
>;
