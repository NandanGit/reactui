export type ArgumentType<T, ind extends number> = T extends (
  ...args: infer U
) => any
  ? U[ind]
  : never;

export type PartialRecord<TKey extends string, TValue> = Partial<
  Record<TKey, TValue>
>;

export type ClassName = string;
export type Style = React.CSSProperties;

export type ClassNameMap<T extends string> = PartialRecord<T, ClassName>;
export type StyleMap<T extends string> = PartialRecord<T, Style>;
