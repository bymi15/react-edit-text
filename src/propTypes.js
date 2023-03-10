import PropTypes from 'prop-types';
import React from 'react';
import EditIcon from './components/EditIcon';

const sharedDefaultProps = {
  id: undefined,
  name: undefined,
  className: undefined,
  value: undefined,
  formatDisplayText: (x) => x,
  defaultValue: undefined,
  placeholder: '',
  onSave: () => {},
  onChange: () => {},
  onEditMode: () => {},
  onBlur: () => {},
  style: {},
  readonly: false,
  inputClassName: undefined
};

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

export const EditTextDefaultProps = {
  ...sharedDefaultProps,
  type: 'text',
  inline: false,
  showEditButton: false,
  editButtonContent: <EditIcon />,
  editButtonProps: {}
};

export const EditTextareaPropTypes = {
  ...sharedPropTypes,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOfType(['auto'])])
};

export const EditTextareaDefaultProps = {
  ...sharedDefaultProps,
  rows: 3
};
