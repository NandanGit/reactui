import React from 'react';
import { componentSizes, componentStates } from './constants';
import { HoverProps, PressProps } from 'react-aria';
import { ArgumentType } from '../../types';

export type ComponentSize = typeof componentSizes[number];

export type ComponentAttributeMap<TSize extends string, TValue> = Partial<
  { [key in TSize]: TValue }
>;

export type SizeToClassNameMap = ComponentAttributeMap<ComponentSize, string>;
export type SizeToStyleMap = ComponentAttributeMap<
  ComponentSize,
  React.CSSProperties
>;

export type ComponentState = typeof componentStates[number];

export type StateToClassNameMap = ComponentAttributeMap<ComponentState, string>;
export type StateToStyleMap = ComponentAttributeMap<
  ComponentState,
  React.CSSProperties
>;

// Events
export type HoverEvent = ArgumentType<HoverProps['onHoverStart'], 0>;

export type PressEvent = ArgumentType<PressProps['onPress'], 0>;
