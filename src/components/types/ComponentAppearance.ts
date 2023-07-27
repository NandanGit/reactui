import type {
  ClassName,
  ClassNameMap,
  PartialRecord,
  Style,
  StyleMap,
} from '../../types';

export interface ComponentAppearance<
  TStatic extends Record<string, string>,
  TDynamic extends string,
  TChildrenAppearances extends PartialRecord<
    string,
    ComponentAppearance<Record<string, string>, string, {}>
  > = {}
> {
  container?: {
    className: ClassName;
    style?: Style;
  },
  static: {
    classNameMaps?: { [key in keyof TStatic]?: ClassNameMap<TStatic[key]> };
    styleMaps?: { [key in keyof TStatic]?: StyleMap<TStatic[key]> };
  };
  dynamic: {
    classNameMap?: ClassNameMap<TDynamic>;
    styleMap?: StyleMap<TDynamic>;
  };
  childrenAppearances?: {
    [key in keyof TChildrenAppearances]?: TChildrenAppearances[key];
  };
}
