/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import $ from 'jquery';
import { i18n } from '@kbn/i18n';
import { times } from 'lodash';
import { elasticOutline } from '../lib/elastic_outline';
import { isValid } from '../../common/lib/url';

export const repeatImage = () => ({
  name: 'repeatImage',
  displayName: i18n.translate('xpack.canvas.renderers.repeatImageDisplayName', {
    defaultMessage: 'Image Repeat',
  }),
  help: i18n.translate('xpack.canvas.renderers.repeatImageHelpText', {
    defaultMessage: 'Repeat an image a given number of times',
  }),
  reuseDomNode: true,
  render(domNode, config, handlers) {
    const settings = {
      count: 10,
      ...config,
      image: isValid(config.image) ? config.image : elasticOutline,
    };

    const container = $('<div class="repeatImage" style="pointer-events: none;">');

    function setSize(img) {
      if (img.naturalHeight > img.naturalWidth) img.height = settings.size;
      else img.width = settings.size;
    }

    function finish() {
      $(domNode).html(container);
      handlers.done();
    }

    const img = new Image();
    img.onload = function() {
      setSize(img);
      if (settings.max && settings.count > settings.max) settings.count = settings.max;
      times(settings.count, () => container.append(img.cloneNode(true)));

      if (isValid(settings.emptyImage)) {
        if (settings.max == null) {
          throw new Error(
            i18n.translate('xpack.canvas.renderers.repeatImage.useEmptyImageErrorMessage', {
              defaultMessage: 'max must be set if using an emptyImage',
            })
          );
        }

        const emptyImage = new Image();
        emptyImage.onload = function() {
          setSize(emptyImage);
          times(settings.max - settings.count, () => container.append(emptyImage.cloneNode(true)));
          finish();
        };
        emptyImage.src = settings.emptyImage;
      } else {
        finish();
      }
    };

    img.src = settings.image;
  },
});
