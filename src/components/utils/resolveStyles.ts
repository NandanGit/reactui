import { ClassNameMap, StyleMap } from '../../types';

/**
 * Resolves styles based on a set of keys, classNameMap, styleMap, and conditionsMap.
 * @param keys - An array of keys to resolve styles for.
 * @param classNameMap - A map of keys to class names.
 * @param styleMap - A map of keys to CSS properties.
 * @param conditionsMap - A map of keys to boolean values.
 * @returns A map of keys to objects containing className and style.
 * @example
 * const buttonVariants = ['filled', 'outline', 'link'];
 * const classNameMap = {
 *   filled: 'btn-filled',
 *   outline: 'btn-outline'
 * };
 * const styleMap = {
 *   filled: { color: 'red' },
 *   link: { color: 'blue' }
 * };
 * const conditionsMap = {
 *   filled: true,
 *   outline: false,
 *   link: true
 * };
 * const result = resolveStyles(buttonVariants, classNameMap, styleMap, conditionsMap);
 *
 * // result = {
 * //   filled: {
 * //     className: 'btn-filled',
 * //     style: { color: 'red' }
 * //   },
 * //   outline: {
 * //     className: '',
 * //     style: {}
 * //   },
 * //   link: {
 * //     className: '',
 * //     style: { color: 'blue' }
 * //   },
 * // }
 * */
export const resolveStyles = <Key extends string>(
  keys: readonly Key[],
  classNameMap: ClassNameMap<Key>,
  styleMap: StyleMap<Key>,
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
