/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';
import React from 'react';
import { Space } from '../../../../../common/model/space';
import { SpaceAvatar } from '../../../../components';

interface Props {
  space: Space;
}

export const AdvancedSettingsTitle = (props: Props) => (
  <EuiFlexGroup gutterSize="s" responsive={false} alignItems={'center'}>
    <EuiFlexItem grow={false}>
      <SpaceAvatar space={props.space} />
    </EuiFlexItem>
    <EuiFlexItem style={{ marginLeft: '10px' }}>
      <EuiText>
        <h1 data-test-subj="managementSettingsTitle">Settings</h1>
      </EuiText>
    </EuiFlexItem>
  </EuiFlexGroup>
);
