/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { get } from 'lodash';
import { i18n } from '@kbn/i18n';
import { getState, getValue } from '../../../public/lib/resolved_arg';

export const pointseries = () => ({
  name: 'pointseries',
  displayName: i18n.translate('xpack.canvas.uis.models.pointseriesDisplayName', {
    defaultMessage: 'Dimensions & Measures',
  }),
  args: [
    {
      name: 'x',
      displayName: i18n.translate('xpack.canvas.uis.models.pointseries.argsXaxisDisplayName', {
        defaultMessage: 'X-axis',
      }),
      help: i18n.translate('xpack.canvas.uis.models.pointseries.argsXaxisHelpText', {
        defaultMessage: 'Data along the horizontal axis. Usually a number, string or date',
      }),
      argType: 'datacolumn',
    },
    {
      name: 'y',
      displayName: i18n.translate('xpack.canvas.uis.models.pointseries.argsYaxisDisplayName', {
        defaultMessage: 'Y-axis',
      }),
      help: i18n.translate('xpack.canvas.uis.models.pointseries.argsYaxisHelpText', {
        defaultMessage: 'Data along the vertical axis. Usually a number.',
      }),
      argType: 'datacolumn',
    },
    {
      name: 'color',
      displayName: i18n.translate('xpack.canvas.uis.models.pointseries.argsColorDisplayName', {
        defaultMessage: 'Color',
      }),
      help: i18n.translate('xpack.canvas.uis.models.pointseries.argsColorHelpText', {
        defaultMessage: 'Determines the color of a mark or series',
      }),
      argType: 'datacolumn',
    },
    {
      name: 'size',
      displayName: i18n.translate('xpack.canvas.uis.models.pointseries.argsSizeDisplayName', {
        defaultMessage: 'Size',
      }),
      help: i18n.translate('xpack.canvas.uis.models.pointseries.argsSizeHelpText', {
        defaultMessage: 'Determine the size of a mark',
      }),
      argType: 'datacolumn',
    },
    {
      name: 'text',
      displayName: i18n.translate('xpack.canvas.uis.models.pointseries.argsTextDisplayName', {
        defaultMessage: 'Text',
      }),
      help: i18n.translate('xpack.canvas.uis.models.pointseries.argsTextHelpText', {
        defaultMessage: 'Set the text to use as, or around, the mark',
      }),
      argType: 'datacolumn',
    },
  ],
  resolve({ context }) {
    if (getState(context) !== 'ready') return { columns: [] };
    return { columns: get(getValue(context), 'columns', []) };
  },
});
