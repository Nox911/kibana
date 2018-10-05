/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { shapes } from '../../renderers/shape/shapes';

export const shape = () => ({
  name: 'shape',
  displayName: i18n.translate('xpack.canvas.uis.views.shapeDisplayName', {
    defaultMessage: 'Shape',
  }),
  modelArgs: [],
  requiresContext: false,
  args: [
    {
      name: '_',
      displayName: i18n.translate('xpack.canvas.uis.views.shape.argsShapeDisplayName', {
        defaultMessage: 'Select a Shape',
      }),
      argType: 'shape',
      options: {
        shapes,
      },
    },
    {
      name: 'fill',
      displayName: i18n.translate('xpack.canvas.uis.views.shape.argsFillDisplayName', {
        defaultMessage: 'Fill',
      }),
      argType: 'color',
      help: i18n.translate('xpack.canvas.uis.views.shape.argsFillHelpText', {
        defaultMessage: 'Fill color of the shape',
      }),
    },
    {
      name: 'border',
      displayName: i18n.translate('xpack.canvas.uis.views.shape.argsBorderDisplayName', {
        defaultMessage: 'Border',
      }),
      argType: 'color',
      help: i18n.translate('xpack.canvas.uis.views.shape.argsBorderHelpText', {
        defaultMessage: 'Border color',
      }),
    },
    {
      name: 'borderWidth',
      displayName: i18n.translate('xpack.canvas.uis.views.shape.argsBorderWidthDisplayName', {
        defaultMessage: 'Border Width',
      }),
      argType: 'number',
      help: i18n.translate('xpack.canvas.uis.views.shape.argsBorderWidthHelpText', {
        defaultMessage: 'Border width',
      }),
    },
    {
      name: 'maintainAspect',
      displayName: i18n.translate('xpack.canvas.uis.views.shape.argsMaintainAspectDisplayName', {
        defaultMessage: 'Maintain Aspect Ratio',
      }),
      argType: 'toggle',
      help: i18n.translate('xpack.canvas.uis.views.shape.argsMaintainAspectHelpText', {
        defaultMessage: "Select 'true' to maintain aspect ratio",
      }),
    },
  ],
});
