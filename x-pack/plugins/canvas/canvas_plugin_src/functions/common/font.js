/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import inlineStyle from 'inline-style';
import { i18n } from '@kbn/i18n';
import { openSans } from '../../../common/lib/fonts';

export const font = () => ({
  name: 'font',
  aliases: [],
  type: 'style',
  help: i18n.translate('xpack.canvas.functions.fontHelpText', {
    defaultMessage: 'Create a font style',
  }),
  context: {
    types: ['null'],
  },
  args: {
    size: {
      types: ['number'],
      help: i18n.translate('xpack.canvas.functions.font.argsSizeHelpText', {
        defaultMessage: 'Font size (px)',
      }),
      default: 14,
    },
    lHeight: {
      types: ['number'],
      aliases: ['lineHeight'],
      help: i18n.translate('xpack.canvas.functions.font.argsLHeightHelpText', {
        defaultMessage: 'Line height (px)',
      }),
    },
    family: {
      types: ['string'],
      default: `"${openSans.value}"`,
      help: i18n.translate('xpack.canvas.functions.font.argsFamilyHelpText', {
        defaultMessage: 'An acceptable CSS web font string',
      }),
    },
    color: {
      types: ['string', 'null'],
      help: i18n.translate('xpack.canvas.functions.font.argsColorHelpText', {
        defaultMessage: 'Text color',
      }),
    },
    weight: {
      types: ['string'],
      help: i18n.translate('xpack.canvas.functions.font.argsWeightHelpText', {
        defaultMessage:
          'Set the font weight, e.g. normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900',
      }),
      default: 'normal',
    },
    underline: {
      types: ['boolean'],
      default: false,
      help: i18n.translate('xpack.canvas.functions.font.argsUnderlineHelpText', {
        defaultMessage: 'Underline the text, true or false',
      }),
    },
    italic: {
      types: ['boolean'],
      default: false,
      help: i18n.translate('xpack.canvas.functions.font.argsItalicHelpText', {
        defaultMessage: 'Italicize, true or false',
      }),
    },
    align: {
      types: ['string'],
      help: i18n.translate('xpack.canvas.functions.font.argsAlignHelpText', {
        defaultMessage: 'Horizontal text alignment',
      }),
      default: 'left',
    },
  },
  fn: (context, args) => {
    const weights = [
      'normal',
      'bold',
      'bolder',
      'lighter',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ];
    const alignments = ['center', 'left', 'right', 'justified'];

    if (!weights.includes(args.weight)) {
      throw new Error(
        i18n.translate('xpack.canvas.functions.font.invalidWeightErrorMessage', {
          defaultMessage: 'Invalid font weight: {weight}',
          values: { weight: args.weight },
        })
      );
    }
    if (!alignments.includes(args.align)) {
      throw new Error(
        i18n.translate('xpack.canvas.functions.font.invalidAlignmentErrorMessage', {
          defaultMessage: 'Invalid text alignment: {alignment}',
          values: { alignment: args.align },
        })
      );
    }

    // the line height shouldn't ever be lower than the size
    const lineHeight = args.lHeight ? `${args.lHeight}px` : 1;

    const spec = {
      fontFamily: args.family,
      fontWeight: args.weight,
      fontStyle: args.italic ? 'italic' : 'normal',
      textDecoration: args.underline ? 'underline' : 'none',
      textAlign: args.align,
      fontSize: `${args.size}px`, // apply font size as a pixel setting
      lineHeight: lineHeight, // apply line height as a pixel setting
    };

    // conditionally apply styles based on input
    if (args.color) spec.color = args.color;

    return {
      type: 'style',
      spec,
      css: inlineStyle(spec),
    };
  },
});
