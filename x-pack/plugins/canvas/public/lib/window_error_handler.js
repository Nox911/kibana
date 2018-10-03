/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import * as knownErrors from '../../common/lib/errors';

const oldHandler = window.onerror;

function showError(err) {
  const body = document.querySelector('body');
  const notice = document.createElement('div');
  notice.classList.add('window-error');

  const close = document.createElement('a');
  close.textContent = 'close';
  close.onclick = ev => {
    ev.preventDefault();
    body.removeChild(notice);
  };
  notice.appendChild(close);

  const uncaughtErrorMessage = i18n.translate(
    'xpack.canvas.lib.windowErrorHandler.uncaughtErrorSwallowedInDevModeMessage',
    {
      defaultMessage: 'Uncaught error swallowed in dev mode',
    }
  );

  // eslint-disable-next-line
  notice.insertAdjacentHTML('beforeend', `<h3>${uncaughtErrorMessage}</h3>`);

  const message = document.createElement('p');
  message.textContent = i18n.translate('xpack.canvas.lib.windowErrorHandlerErrorMessage', {
    defaultMessage: 'Error: {errorMessage}',
    values: { errorMessage: err.message },
  });
  notice.appendChild(message);

  if (err.stack) {
    const stack = document.createElement('pre');
    stack.textContent = err.stack
      .split('\n')
      .slice(0, 2)
      .concat('...')
      .join('\n');
    notice.appendChild(stack);
  }

  const checkConsoleMessage = i18n.translate(
    'xpack.canvas.lib.windowErrorHandler.checkConsoleMessage',
    {
      defaultMessage: 'Check console for more information',
    }
  );

  // eslint-disable-next-line
  notice.insertAdjacentHTML('beforeend', `<p>${checkConsoleMessage}</p>`);
  body.appendChild(notice);
}

// React will delegate to window.onerror, even when errors are caught with componentWillCatch,
// so check for a known custom error type and skip the default error handling when we find one
window.onerror = (...args) => {
  const [message, , , , err] = args;

  const isKnownError = Object.keys(knownErrors).find(errorName => {
    return err.constructor.name === errorName || message.indexOf(errorName) >= 0;
  });
  if (isKnownError) return;

  // uncaught errors are silenced in dev mode
  // NOTE: react provides no way I can tell to distingish that an error came from react, it just
  // throws generic Errors. In development mode, it throws those errors even if you catch them in
  // an error boundary. This uses in the stack trace to try to detect it, but that stack changes
  // between development and production modes. Fortunately, beginWork exists in both, so it uses
  // a mix of the runtime mode and checking for another react method (renderRoot) for development
  // TODO: this is *super* fragile. If the React method names ever change, which seems kind of likely,
  // this check will break.
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    // TODO: we should do something here to let the user know something failed,
    // but we don't currently have an error logging service
    console.error(err);
    console.warn(`*** Uncaught error swallowed in dev mode ***

Check and fix the above error. This will blow up Kibana when run in production mode!`);
    showError(err);
    return;
  }

  // fall back to the default kibana uncaught error handler
  oldHandler(...args);
};
