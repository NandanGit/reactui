export type ArgumentType<T, ind extends number> = T extends (
  ...args: infer U
) => any
  ? U[ind]
  : never;

export type PartialRecord<TKey extends string, TValue> = Partial<
  Record<TKey, TValue>
>;

export type StyleMap<T extends string> = PartialRecord<T, React.CSSProperties>;
export type ClassNameMap<T extends string> = PartialRecord<T, string>;
