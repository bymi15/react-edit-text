import classnames from 'classnames';
import React from 'react';
import { EditTextDefaultProps, EditTextPropTypes } from './propTypes';
import styles from './styles.module.css';

export default class EditText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousValue: props.defaultValue || '',
      savedText: props.defaultValue || '',
      editMode: false
    };
    this.inputRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.savedText && props.value !== undefined) {
      if (state.editMode) {
        return {
          savedText: props.value
        };
      } else {
        return {
          previousValue: props.value,
          savedText: props.value
        };
      }
    }
    return null;
  }

  handleClick = () => {
    if (this.props.readonly) return;
    this.setState({
      editMode: true
    });
    this.props.onEditMode();
  };

  handleBlur = (save = true) => {
    if (this.inputRef.current) {
      const { name, value } = this.inputRef.current;
      if (save && this.state.previousValue !== value) {
        this.props.onSave({
          name,
          value,
          previousValue: this.state.previousValue
        });
        this.setState({
          savedText: value,
          previousValue: value
        });
      } else if (!save) {
        if (this.props.onChange) {
          this.props.onChange(this.state.previousValue);
        }
      }
      this.setState({
        editMode: false
      });
      this.props.onBlur();
    }
  };

  handleKeydown = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      this.handleBlur();
    } else if (e.keyCode === 27 || e.charCode === 27) {
      this.handleBlur(false);
    }
  };

  handleFocus = (e) => {
    if (this.props.type === 'text') {
      e.currentTarget.setSelectionRange(
        e.currentTarget.value.length,
        e.currentTarget.value.length
      );
    }
  };

  renderDisplayMode = () => {
    const { savedText } = this.state;
    const {
      id,
      className,
      placeholder,
      inline,
      style,
      readonly,
      formatDisplayText
    } = this.props;
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
        {formatDisplayText(savedText) || placeholder}
      </div>
    );
  };

  renderEditMode = (controlled) => {
    const {
      id,
      className,
      name,
      type,
      inline,
      style,
      value,
      onChange
    } = this.props;
    const { savedText } = this.state;
    if (controlled) {
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
          onFocus={this.handleFocus}
        />
      );
    }
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
        onFocus={this.handleFocus}
      />
    );
  };

  render() {
    const { readonly, value } = this.props;
    const { editMode } = this.state;

    if (!readonly && editMode) {
      return this.renderEditMode(value !== undefined);
    } else {
      return this.renderDisplayMode();
    }
  }
}

EditText.defaultProps = EditTextDefaultProps;
EditText.propTypes = EditTextPropTypes;
