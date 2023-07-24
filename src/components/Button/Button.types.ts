import {
  ComponentSize,
  ComponentAttributeMap,
  InteractionState,
  ComponentStatus,
} from '../types';

export type ButtonSize = Exclude<ComponentSize, 'xs' | 'xl'>;
export type ButtonSizeToClassNameMap = ComponentAttributeMap<
  ButtonSize,
  string
>;
export type ButtonSizeToStyleMap = ComponentAttributeMap<
  ButtonSize,
  React.CSSProperties
>;

export type ButtonState = InteractionState;
export type ButtonStateToClassNameMap = ComponentAttributeMap<
  ButtonState,
  string
>;
export type ButtonStateToStyleMap = ComponentAttributeMap<
  ButtonState,
  React.CSSProperties
>;

export type ButtonStatus = ComponentStatus | 'primary' | 'secondary';
export type ButtonStatusToClassNameMap = ComponentAttributeMap<
  ButtonStatus,
  string
>;
export type ButtonStatusToStyleMap = ComponentAttributeMap<
  ButtonStatus,
  React.CSSProperties
>;

export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'link';
export type ButtonVariantToClassNameMap = ComponentAttributeMap<
  ButtonVariant,
  string
>;
export type ButtonVariantToStyleMap = ComponentAttributeMap<
  ButtonVariant,
  React.CSSProperties
>;
