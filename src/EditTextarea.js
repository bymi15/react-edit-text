import classnames from 'classnames';
import React from 'react';
import { EditTextareaDefaultProps, EditTextareaPropTypes } from './propTypes';
import styles from './styles.module.css';

const splitLines = (val) => (val ? val.split(/\r?\n/) : []);

export default class EditTextarea extends React.Component {
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
          previousValue: value,
          savedText: value
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
    if (e.keyCode === 27 || e.charCode === 27) {
      this.handleBlur(false);
    }
  };

  renderDisplayMode = () => {
    const { savedText } = this.state;
    const {
      id,
      className,
      placeholder,
      style,
      readonly,
      rows,
      formatDisplayText
    } = this.props;
    const viewStyle = {
      ...style,
      height: `${rows * 24 + 16}px`
    };
    const textLines = splitLines(formatDisplayText(savedText));
    return (
      <div
        id={id}
        className={classnames(
          styles.shared,
          styles.textareaView,
          {
            [styles.placeholder]: placeholder && !savedText,
            [styles.readonly]: readonly
          },
          className
        )}
        onClick={this.handleClick}
        style={viewStyle}
      >
        {textLines.length > 0 ? (
          textLines.map((text, index) => (
            <React.Fragment key={index}>
              <span>{text}</span>
              <br />
            </React.Fragment>
          ))
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
    );
  };

  renderEditMode = (controlled) => {
    const { id, className, name, style, value, onChange, rows } = this.props;
    const { savedText } = this.state;
    if (controlled) {
      return (
        <textarea
          id={id}
          className={classnames(styles.shared, className)}
          style={style}
          ref={this.inputRef}
          rows={rows}
          name={name}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeydown}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
        />
      );
    }
    return (
      <textarea
        id={id}
        className={classnames(styles.shared, className)}
        style={style}
        ref={this.inputRef}
        rows={rows}
        name={name}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeydown}
        defaultValue={savedText}
        autoFocus
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
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

EditTextarea.defaultProps = EditTextareaDefaultProps;
EditTextarea.propTypes = EditTextareaPropTypes;
