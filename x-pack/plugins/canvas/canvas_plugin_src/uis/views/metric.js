/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { openSans } from '../../../common/lib/fonts';

export const metric = () => ({
  name: 'metric',
  displayName: i18n.translate('xpack.canvas.uis.views.metricDisplayName', {
    defaultMessage: 'Metric',
  }),
  modelArgs: [['_', { label: 'Number' }]],
  requiresContext: false,
  args: [
    {
      name: '_',
      displayName: i18n.translate('xpack.canvas.uis.views.metric.args.underscoreDisplayName', {
        defaultMessage: 'Label',
      }),
      help: i18n.translate('xpack.canvas.uis.views.metric.args.underscoreHelpText', {
        defaultMessage: 'Describes the metric',
      }),
      argType: 'string',
      default: '""',
    },
    {
      name: 'metricFont',
      displayName: i18n.translate('xpack.canvas.uis.views.metric.args.metricFontDisplayName', {
        defaultMessage: 'Metric text settings',
      }),
      help: i18n.translate('xpack.canvas.uis.views.metric.args.metricFontHelpText', {
        defaultMessage: 'Fonts, alignment and color',
      }),
      argType: 'font',
      default: `{font size=48 family="${openSans.value}" color="#000000" align=center lHeight=48}`,
    },
    {
      name: 'labelFont',
      displayName: i18n.translate('xpack.canvas.uis.views.metric.args.labelFontDisplayName', {
        defaultMessage: 'Label text settings',
      }),
      help: i18n.translate('xpack.canvas.uis.views.metric.args.labelFontHelpText', {
        defaultMessage: 'Fonts, alignment and color',
      }),
      argType: 'font',
      default: `{font size=18 family="${openSans.value}" color="#000000" align=center}`,
    },
  ],
});
