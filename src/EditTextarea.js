import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class EditTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedText: props.value,
      savedTextLines: props.value ? props.value.split('/\r?\n/') : [],
      editMode: false
    };
    this.inputRef = React.createRef();
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
        const lines = value === '' ? [] : value.split(/\r?\n/);
        this.setState({
          savedText: value,
          savedTextLines: lines
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
    if (e.keyCode === 27 || e.charCode === 27) {
      // esc key
      this.handleBlur(false);
    }
  };

  render() {
    const {
      id,
      className,
      name,
      rows,
      placeholder,
      style,
      readonly
    } = this.props;
    const { editMode, savedText, savedTextLines } = this.state;

    const viewStyle = {
      ...style,
      height: `${rows * 24 + 16}px`
    };

    if (!readonly && editMode) {
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
        />
      );
    } else {
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
          {savedTextLines && savedTextLines.length > 0 ? (
            savedTextLines.map((text, index) => (
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
    }
  }
}

EditTextarea.defaultProps = {
  id: null,
  name: null,
  className: null,
  rows: 3,
  value: '',
  placeholder: '',
  onSave: () => {},
  style: {},
  readonly: false
};

EditTextarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  readonly: PropTypes.bool
};
