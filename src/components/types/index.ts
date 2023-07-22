import React from 'react';
import { componentSizes, componentStates } from './constants';

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
