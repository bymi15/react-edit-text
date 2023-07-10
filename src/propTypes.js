import PropTypes from 'prop-types';
import React from 'react';

const sharedPropTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  formatDisplayText: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  onEditMode: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  readonly: PropTypes.bool,
  inputClassName: PropTypes.string
};

export const EditTextPropTypes = {
  ...sharedPropTypes,
  type: PropTypes.string,
  inline: PropTypes.bool,
  showEditButton: PropTypes.bool,
  editButtonContent: PropTypes.any,
  editButtonProps: PropTypes.object
};

export const EditTextareaPropTypes = {
  ...sharedPropTypes,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])
};
