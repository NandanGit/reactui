import { ClassName, ClassNameMap, Style, StyleMap } from '../../types';

export function resolveRadioStyles<T extends Record<string, string>>(
  maps: {
    [key in keyof T]: [
      T[key],
      ClassNameMap<T[key]> | undefined,
      StyleMap<T[key]> | undefined
    ];
  },
  prefixClassName = 'rui'
) {
  return Object.keys(maps).reduce((acc, key) => {
    const curr = maps[key as keyof T];
    const [
      value,
      classNameMap = {} as ClassNameMap<string>,
      styleMap = {} as StyleMap<string>,
    ] = curr;
    const defaultClassName =
      prefixClassName !== undefined ? `${prefixClassName}-${key}-${value}` : '';
    return {
      ...acc,
      [key]: {
        style: styleMap[value] || {},
        className: `${defaultClassName} ${classNameMap[value] || ''}`,
      },
    };
  }, {}) as Record<keyof T, { style: Style; className: ClassName }>;
}
