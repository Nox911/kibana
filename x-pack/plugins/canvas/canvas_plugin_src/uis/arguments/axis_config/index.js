/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { templateFromReactComponent } from '../../../../public/lib/template_from_react_component';
import { SimpleTemplate } from './simple_template';
import { ExtendedTemplate } from './extended_template';

export const axisConfig = () => ({
  name: 'axisConfig',
  displayName: i18n.translate('xpack.canvas.uis.arguments.axisConfigDisplayName', {
    defaultMessage: 'Axis Config',
  }),
  help: i18n.translate('xpack.canvas.uis.arguments.axisConfigHelpText', {
    defaultMessage: 'Visualization axis configuration',
  }),
  simpleTemplate: templateFromReactComponent(SimpleTemplate),
  template: templateFromReactComponent(ExtendedTemplate),
});
