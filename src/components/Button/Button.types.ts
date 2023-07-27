import { ComponentSize, InteractionState, ComponentStatus } from '../types';
import { ComponentAppearance } from '../types/ComponentAppearance';

export type ButtonSize = Exclude<ComponentSize, 'xs' | 'xl'>;
export type ButtonStatus = ComponentStatus | 'primary' | 'secondary';
export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'link';

export type ButtonInteractionState = InteractionState;

export interface ButtonAppearance
  extends Omit<
    ComponentAppearance<
      {
        size: ButtonSize;
        status: ButtonStatus;
        variant: ButtonVariant;
      },
      ButtonInteractionState
    >,
    'container' | 'childrenAppearances'
  > {}
