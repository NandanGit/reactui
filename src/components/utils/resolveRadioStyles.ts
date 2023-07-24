import { ClassNameMap, StyleMap } from "../../types";


export function resolveRadioStyles<T extends [string, string][]>(
  maps: {
    [key in T[number][0]]: [
      T[number][1],
      ClassNameMap<T[number][1]>,
      StyleMap<T[number][1]>
    ];
  },
  prefixClassName = 'rui'
) {
  return Object.keys(maps).reduce((acc, key) => {
    const curr = maps[key as T[number][0]];
    const defaultClassName =
      prefixClassName !== undefined
        ? `${prefixClassName}-${key}-${curr[0]}`
        : '';
    return {
      ...acc,
      [key+"Styles"]: {
        style: curr[2][curr[0]] || {},
        className: `${defaultClassName} ${curr[1][curr[0]] || ''}`,
      },
    };
  }, {}) as Record<
    `${T[number][0]}Styles`,
    { style: React.CSSProperties; className: string }
  >;
}
