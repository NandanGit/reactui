export type ArgumentType<T, ind extends number> = T extends (
  ...args: infer U
) => any
  ? U[ind]
  : never;
