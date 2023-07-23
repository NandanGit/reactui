type PartialRecord<TKey extends string, TValue> = Partial<Record<TKey, TValue>>;

export const resolveStyles = <Key extends string>(
  keys: readonly Key[],
  classNameMap: PartialRecord<Key, string>,
  styleMap: PartialRecord<Key, React.CSSProperties>,
  conditionsMap: Record<Key, boolean>
): Record<Key, { className: string; style: React.CSSProperties }> => {
  return keys.reduce((acc, key) => {
    const isActive = conditionsMap[key];
    const style = styleMap[key] || {};
    const className = classNameMap[key] || '';
    if (isActive) {
      return {
        ...acc,
        [key]: {
          style,
          className,
        },
      };
    }
    return {
      ...acc,
      [key]: {
        style: {},
        className: '',
      },
    };
  }, {}) as ReturnType<typeof resolveStyles>;
};
