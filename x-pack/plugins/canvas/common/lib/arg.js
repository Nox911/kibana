/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { includes } from 'lodash';
import { i18n } from '@kbn/i18n';

export function Arg(config) {
  if (config.name === '_') {
    throw Error(
      i18n.translate('xpack.canvas.args.undercoreIsNotAllowedInArgNameErrorMessage', {
        defaultMessage: '_ is not allowed as an argument name. Use it in aliases instead.',
      })
    );
  }
  this.name = config.name;
  this.required = config.required || false;
  this.help = config.help || '';
  this.types = config.types || [];
  this.default = config.default;
  this.aliases = config.aliases || [];
  this.multi = config.multi == null ? false : config.multi;
  this.resolve = config.resolve == null ? true : config.resolve;
  this.options = config.options || [];
  this.accepts = type => {
    if (!this.types.length) return true;
    return includes(config.types, type);
  };
}
