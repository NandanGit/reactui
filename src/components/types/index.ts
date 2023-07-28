import React from 'react';
import {
  componentSizes,
  componentInteractionStates,
  componentStatuses,
  extendedComponentSizes,
} from './constants';
import { HoverProps, PressProps } from 'react-aria';
import { ArgumentType } from '../../types';

export type ComponentAttributeMap<TKey extends string, TValue> = Partial<
  { [key in TKey]: TValue }
>;

export type ComponentSize = typeof componentSizes[number];
export type ExtendedComponentSize = typeof extendedComponentSizes[number];

export type SizeToClassNameMap = ComponentAttributeMap<ComponentSize, string>;
export type SizeToStyleMap = ComponentAttributeMap<
  ComponentSize,
  React.CSSProperties
>;

export type InteractionState = typeof componentInteractionStates[number];
export type StateToClassNameMap = ComponentAttributeMap<
  InteractionState,
  string
>;
export type StateToStyleMap = ComponentAttributeMap<
  InteractionState,
  React.CSSProperties
>;

export type ComponentStatus = typeof componentStatuses[number];
export type StatusToClassNameMap = ComponentAttributeMap<
  ComponentStatus,
  string
>;
export type StatusToStyleMap = ComponentAttributeMap<
  ComponentStatus,
  React.CSSProperties
>;

// Events
export type HoverEvent = ArgumentType<HoverProps['onHoverStart'], 0>;

export type PressEvent = ArgumentType<PressProps['onPress'], 0>;
