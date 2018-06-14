import React from 'react';
import PropTypes from 'prop-types';
import { EuiFieldText, EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { ColorDot } from '../color_dot/color_dot';

export const ColorManager = ({ value, addColor, removeColor, onChange }) => (
  <EuiFlexGroup gutterSize="xs" alignItems="center">
    <EuiFlexItem grow={1}>
      <ColorDot value={value} />
    </EuiFlexItem>
    <EuiFlexItem grow={5} style={{ display: 'inline-block' }}>
      <EuiFieldText
        value={value || ''}
        placeholder="#hex color"
        onChange={e => onChange(e.target.value)}
      />
    </EuiFlexItem>
    {(addColor || removeColor) && (
      <EuiFlexItem grow={false}>
        {addColor && (
          <EuiButtonIcon
            aria-label="Add Color"
            iconType="plusInCircle"
            onClick={() => addColor(value)}
          />
        )}
        {removeColor && (
          <EuiButtonIcon
            aria-label="Remove Color"
            iconType="minusInCircle"
            onClick={() => removeColor(value)}
          />
        )}
      </EuiFlexItem>
    )}
  </EuiFlexGroup>
);

ColorManager.propTypes = {
  value: PropTypes.string,
  addColor: PropTypes.func,
  removeColor: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};
