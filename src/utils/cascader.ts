import { CascaderOptionType } from 'antd/lib/cascader';

import { capitalize } from './string';

export const labelify = (options: CascaderOptionType): CascaderOptionType =>
  Object.assign(
    options,
    typeof options.value !== 'undefined'
    ? {
      label: typeof options.label !== 'undefined'
        ? options.label
        : capitalize(options.value),
    }
    : null,
    Array.isArray(options.children)
    ? {
      children: options.children.map(labelify),
    }
    : null,
  );
