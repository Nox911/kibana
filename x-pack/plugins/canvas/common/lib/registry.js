/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import clone from 'lodash.clone';
import { i18n } from '@kbn/i18n';

export class Registry {
  constructor(prop = 'name') {
    if (typeof prop !== 'string') {
      throw new Error(
        i18n.translate('xpack.canvas.registry.registryPropertyNameTypeErrorMessage', {
          defaultMessage: 'Registry property name must be a string; found {foundType}',
          values: {
            foundType: typeof prop,
          },
        })
      );
    }
    this._prop = prop;
    this._indexed = new Object();
  }

  wrapper(obj) {
    return obj;
  }

  register(fn) {
    if (typeof fn !== 'function') {
      throw new Error(
        i18n.translate(
          'xpack.canvas.registry.functionsMustReturnObjectWithSpecificProprtyErrorMessage',
          {
            defaultMessage: 'Register requires an function; found {foundType}',
            values: {
              foundType: typeof fn,
            },
          }
        )
      );
    }

    const obj = fn();

    if (typeof obj !== 'object' || !obj[this._prop]) {
      throw new Error(
        i18n.translate(
          'xpack.canvas.lib.registry.functionsMustReturnObjectWithProprtyErrorMessage',
          {
            defaultMessage: 'Registered functions must return an object with a {property} property',
            values: { property: this._prop },
          }
        )
      );
    }

    this._indexed[obj[this._prop].toLowerCase()] = this.wrapper(obj);
  }

  toJS() {
    return Object.keys(this._indexed).reduce((acc, key) => {
      acc[key] = this.get(key);
      return acc;
    }, {});
  }

  toArray() {
    return Object.keys(this._indexed).map(key => this.get(key));
  }

  get(name) {
    if (name === undefined) return null;
    const lowerCaseName = name.toLowerCase();
    return this._indexed[lowerCaseName] ? clone(this._indexed[lowerCaseName]) : null;
  }

  getProp() {
    return this._prop;
  }

  reset() {
    this._indexed = new Object();
  }
}
