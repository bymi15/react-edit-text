import PropTypes from 'prop-types';

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
  readonly: false
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
  readonly: PropTypes.bool
};

export const EditTextPropTypes = {
  ...sharedPropTypes,
  type: PropTypes.string,
  inline: PropTypes.bool
};

export const EditTextDefaultProps = {
  ...sharedDefaultProps,
  type: 'text',
  inline: false
};

export const EditTextareaPropTypes = {
  ...sharedPropTypes,
  rows: PropTypes.number
};

export const EditTextareaDefaultProps = {
  ...sharedDefaultProps,
  rows: 3
};
