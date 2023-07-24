type PartialRecord<TKey extends string, TValue> = Partial<Record<TKey, TValue>>;
type StyleMap<T extends string> = PartialRecord<T, React.CSSProperties>;
type ClassNameMap<T extends string> = PartialRecord<T, string>;

export function resolveRadioStyles<T extends [string, string][]>(
  maps: {
    [key in T[number][0]]: {
      current: T[number][1];
      styleMap: StyleMap<T[number][1]>;
      classNameMap: ClassNameMap<T[number][1]>;
    };
  },
  prefixClassName = 'rui'
) {
  return Object.keys(maps).reduce((acc, key) => {
    const curr = maps[key as T[number][0]];
    const defaultClassName =
      prefixClassName !== undefined
        ? `${prefixClassName}-${key}-${curr.current}`
        : '';
    return {
      ...acc,
      [key]: {
        style: curr.styleMap[curr.current] || {},
        className: `${defaultClassName} ${curr.classNameMap[curr.current] ||
          ''}`,
      },
    };
  }, {}) as Record<
    T[number][0],
    { style: React.CSSProperties; className: string }
  >;
}
