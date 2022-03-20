import classnames from 'classnames';
import React from 'react';
import Input from './components/Input';
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

  handleClickDisplay = () => {
    if (this.props.readonly || this.props.showEditButton) return;
    this.setState({
      editMode: true
    });
    this.props.onEditMode();
  };

  handleClickEditButton = () => {
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
      formatDisplayText,
      showEditButton,
      editButtonContent,
      editButtonProps
    } = this.props;
    return (
      <div className={styles.displayContainer}>
        <div
          id={id}
          className={classnames(
            styles.shared,
            styles.label,
            {
              [styles.placeholder]: placeholder && !savedText,
              [styles.inline]: inline,
              [styles.readonly]: readonly || showEditButton
            },
            className
          )}
          onClick={this.handleClickDisplay}
          style={style}
        >
          {formatDisplayText(savedText) || placeholder}
        </div>
        {showEditButton && !readonly && (
          <button
            type='button'
            className={styles.editButton}
            {...editButtonProps}
            onClick={this.handleClickEditButton}
          >
            {editButtonContent}
          </button>
        )}
      </div>
    );
  };

  renderEditMode = (controlled) => {
    const { value, onChange } = this.props;
    const { savedText } = this.state;
    if (controlled) {
      return (
        <Input
          inputRef={this.inputRef}
          handleBlur={this.handleBlur}
          handleKeydown={this.handleKeydown}
          handleFocus={this.handleFocus}
          props={this.props}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    }
    return (
      <Input
        inputRef={this.inputRef}
        handleBlur={this.handleBlur}
        handleKeydown={this.handleKeydown}
        handleFocus={this.handleFocus}
        props={this.props}
        defaultValue={savedText}
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
