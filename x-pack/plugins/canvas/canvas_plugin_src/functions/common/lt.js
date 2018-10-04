/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';

export const lt = () => ({
  name: 'lt',
  type: 'boolean',
  help: i18n.translate('xpack.canvas.functions.ltHelpText', {
    defaultMessage: 'Return if the context is less than the argument',
  }),
  args: {
    value: {
      aliases: ['_'],
      types: ['boolean', 'number', 'string', 'null'],
      required: true,
      help: i18n.translate('xpack.canvas.functions.lt.argsValueHelpText', {
        defaultMessage: 'The value to compare the context to',
      }),
    },
  },
  fn: (context, args) => {
    if (typeof context !== typeof args.value) return false;
    return context < args.value;
  },
});
