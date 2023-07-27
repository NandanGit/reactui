import { ComponentSize, InteractionState, ComponentStatus } from '../types';

export type ButtonSize = Exclude<ComponentSize, 'xs' | 'xl'>;
export type ButtonStatus = ComponentStatus | 'primary' | 'secondary';
export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'link';

export type ButtonInteractionState = InteractionState;
