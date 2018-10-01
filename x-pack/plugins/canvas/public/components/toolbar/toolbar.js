/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiOverlayMask,
  EuiModal,
  EuiModalFooter,
  EuiButton,
} from '@elastic/eui';
import { FormattedMessage, injectI18n } from '@kbn/i18n/react';
import { Navbar } from '../navbar';
import { WorkpadLoader } from '../workpad_loader';
import { PageManager } from '../page_manager';
import { Expression } from '../expression';
import { Tray } from './tray';

const ToolbarUI = props => {
  const {
    editing,
    selectedElement,
    tray,
    setTray,
    previousPage,
    nextPage,
    selectedPageNumber,
    workpadName,
    totalPages,
    intl,
  } = props;

  const elementIsSelected = Boolean(selectedElement);

  const done = () => setTray(null);

  const showHideTray = exp => {
    if (tray && tray === exp) return done();
    setTray(exp);
  };

  const workpadLoader = (
    <EuiOverlayMask>
      <EuiModal onClose={done} className="canvasModal--fixedSize" maxWidth="1000px">
        <WorkpadLoader onClose={done} />
        <EuiModalFooter>
          <EuiButton size="s" onClick={done}>
            <FormattedMessage
              id="xpack.canvas.toolbar.dismissButtonLabel"
              defaultMessage="Dismiss"
            />
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );

  const trays = {
    pageManager: <PageManager previousPage={previousPage} />,
    workpadloader: workpadLoader,
    expression: !elementIsSelected ? null : <Expression done={done} />,
  };

  return !editing ? null : (
    <div className="canvasToolbar hide-for-sharing">
      {trays[tray] && <Tray done={done}>{trays[tray]}</Tray>}
      <Navbar>
        <EuiFlexGroup alignItems="center" gutterSize="none" className="canvasToolbar__controls">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              color="text"
              iconType="grid"
              onClick={() => showHideTray('workpadloader')}
            >
              {workpadName}
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false} />
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              color="text"
              onClick={previousPage}
              iconType="arrowLeft"
              disabled={selectedPageNumber <= 1}
              aria-label={intl.formatMessage({
                id: 'xpack.canvas.toolbar.previousPageButtonAriaLabel',
                defaultMessage: 'Previous Page',
              })}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty color="text" onClick={() => showHideTray('pageManager')}>
              {totalPages > 1 ? (
                <FormattedMessage
                  id="xpack.canvas.toolbar.currentPageOfPagesButtonLabel"
                  defaultMessage="Page {selectedPageNumber} of {totalPages}"
                  values={{ selectedPageNumber, totalPages }}
                />
              ) : (
                <FormattedMessage
                  id="xpack.canvas.toolbar.currentPageButtonLabel"
                  defaultMessage="Page {selectedPageNumber}"
                  values={{ selectedPageNumber }}
                />
              )}
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              color="text"
              onClick={nextPage}
              iconType="arrowRight"
              disabled={selectedPageNumber >= totalPages}
              aria-label={intl.formatMessage({
                id: 'xpack.canvas.toolbar.nextPageButtonAriaLabel',
                defaultMessage: 'Next Page',
              })}
            />
          </EuiFlexItem>
          <EuiFlexItem />
          {elementIsSelected && (
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                color="text"
                iconType="editorCodeBlock"
                onClick={() => showHideTray('expression')}
              >
                <FormattedMessage
                  id="xpack.canvas.toolbar.expressionEditorButtonLabel"
                  defaultMessage="Expression editor"
                />
              </EuiButtonEmpty>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </Navbar>
    </div>
  );
};

ToolbarUI.propTypes = {
  workpadName: PropTypes.string,
  editing: PropTypes.bool,
  tray: PropTypes.node,
  setTray: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  selectedPageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  selectedElement: PropTypes.object,
};

export const Toolbar = injectI18n(ToolbarUI);
