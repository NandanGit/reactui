import { ClassName, Style } from '../../types';
import { ButtonSize, ButtonStatus } from '../Button/Button.types';
import { ComponentAppearance } from '../types/ComponentAppearance';

export function resolveStaticStyles<T extends Record<string, string>>(
  staticStyles: ComponentAppearance<
    Record<keyof T, T[keyof T]>,
    ''
  >['static'] = {},
  values: { [key in keyof T]: T[key] }
) {
  return Object.keys(values).reduce((acc, key) => {
    const value = values[key as keyof T];
    const defaultClassName = `rui-${key}-${value}`;
    return {
      ...acc,
      [key]: {
        style: staticStyles.styleMaps?.[key]?.[value] || {},
        className: `${defaultClassName} ${staticStyles.classNameMaps?.[key]?.[
          value
        ] || ''}`,
      },
    };
  }, {}) as Record<keyof T, { style: Style; className: ClassName }>;
}

resolveStaticStyles<{
  size: ButtonSize;
  status: ButtonStatus;
}>(
  {},
  {
    size: 'sm',
    status: 'primary',
  }
);
