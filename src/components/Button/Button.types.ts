import { ComponentSize, ComponentAttributeMap, ComponentState } from '../types';

export type ButtonSize = Exclude<ComponentSize, 'xs' | 'xl'>;

export type ButtonSizeToClassNameMap = ComponentAttributeMap<
  ButtonSize,
  string
>;

export type ButtonSizeToStyleMap = ComponentAttributeMap<
  ButtonSize,
  React.CSSProperties
>;

export type ButtonState = ComponentState;

export type ButtonStateToClassNameMap = ComponentAttributeMap<
  ButtonState,
  string
>;

export type ButtonStateToStyleMap = ComponentAttributeMap<
  ButtonState,
  React.CSSProperties
>;
