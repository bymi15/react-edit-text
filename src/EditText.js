import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class EditText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedText: props.defaultValue || '',
      editMode: false
    };
    this.inputRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.savedText && props.value !== null) {
      return {
        savedText: props.value
      };
    }
    return null;
  }

  handleClick = () => {
    if (this.props.readonly) return;
    this.setState({
      editMode: true
    });
  };

  handleBlur = (save = true) => {
    if (this.inputRef.current) {
      const { name, value } = this.inputRef.current;
      if (!!save && this.state.savedText !== value) {
        this.setState({
          savedText: value
        });
        this.props.onSave({
          name,
          value
        });
      }
      this.setState({
        editMode: false
      });
    }
  };

  handleKeydown = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      // enter key
      this.handleBlur();
    } else if (e.keyCode === 27 || e.charCode === 27) {
      // esc key
      this.handleBlur(false);
    }
  };

  render() {
    const {
      id,
      className,
      name,
      type,
      placeholder,
      inline,
      style,
      readonly,
      value,
      onChange
    } = this.props;
    const { editMode, savedText } = this.state;

    if (!readonly && editMode) {
      if (value !== null) {
        return (
          <input
            id={id}
            className={classnames(
              styles.shared,
              {
                [styles.inline]: inline
              },
              className
            )}
            style={style}
            ref={this.inputRef}
            type={type}
            name={name}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeydown}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            autoFocus
          />
        );
      } else {
        return (
          <input
            id={id}
            className={classnames(
              styles.shared,
              {
                [styles.inline]: inline
              },
              className
            )}
            style={style}
            ref={this.inputRef}
            type={type}
            name={name}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeydown}
            defaultValue={savedText}
            autoFocus
          />
        );
      }
    } else {
      return (
        <div
          id={id}
          className={classnames(
            styles.shared,
            styles.label,
            {
              [styles.placeholder]: placeholder && !savedText,
              [styles.inline]: inline,
              [styles.readonly]: readonly
            },
            className
          )}
          onClick={this.handleClick}
          style={style}
        >
          {savedText || placeholder}
        </div>
      );
    }
  }
}

EditText.defaultProps = {
  id: null,
  name: null,
  className: null,
  type: 'text',
  value: null,
  defaultValue: null,
  placeholder: '',
  onSave: () => {},
  onChange: () => {},
  inline: false,
  style: {},
  readonly: false
};

EditText.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  readonly: PropTypes.bool
};
