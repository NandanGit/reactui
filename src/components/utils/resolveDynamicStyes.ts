import { ClassNameMap, StyleMap } from '../../types';

export const resolveDynamicStyles = <Keys extends readonly string[]>(
  keys: Keys,
  styles:
    | {
        classNameMap?: ClassNameMap<Keys[number]>;
        styleMap?: StyleMap<Keys[number]>;
      }
    | undefined,
  conditionsMap: Record<Keys[number], boolean>
): Record<Keys[number], { className: string; style: React.CSSProperties }> => {
  return keys.reduce((acc, key) => {
    const isActive = conditionsMap[key as Keys[number]];
    const style = styles?.styleMap?.[key as Keys[number]] || {};
    const className = styles?.classNameMap?.[key as Keys[number]] || '';
    return {
      ...acc,
      [key]: {
        style: isActive ? style : {},
        className: isActive ? className : '',
      },
    };
  }, {}) as ReturnType<typeof resolveDynamicStyles>;
};
