import classnames from 'classnames';
import React from 'react';
import Textarea from './components/Textarea';
import { EditTextareaDefaultProps, EditTextareaPropTypes } from './propTypes';
import styles from './styles.module.css';

const splitLines = (val) => (val ? val.split(/\r?\n/) : []);

export default function EditTextarea({
  id,
  rows,
  name,
  className,
  placeholder,
  style,
  readonly,
  value,
  defaultValue,
  formatDisplayText,
  onEditMode,
  onChange,
  onSave,
  onBlur
}) {
  const inputRef = React.useRef(null);
  const [previousValue, setPreviousValue] = React.useState('');
  const [savedText, setSavedText] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setPreviousValue(defaultValue);
      setSavedText(defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (value !== undefined) {
      setSavedText(value);
      if (!editMode) {
        setPreviousValue(value);
      }
    }
  }, [value, editMode]);

  const handleClick = () => {
    if (readonly) return;
    setEditMode(true);
    onEditMode();
  };

  const handleBlur = (save = true) => {
    if (inputRef.current) {
      const { name, value } = inputRef.current;
      if (save && previousValue !== value) {
        onSave({
          name,
          value,
          previousValue: previousValue
        });
        setSavedText(value);
        setPreviousValue(value);
      } else if (!save) {
        onChange(previousValue);
      }
      setEditMode(false);
      onBlur();
    }
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 27 || e.charCode === 27) {
      handleBlur(false);
    }
  };

  const renderDisplayMode = () => {
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
        onClick={handleClick}
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

  const renderEditMode = (controlled) => {
    if (controlled) {
      return (
        <Textarea
          inputRef={inputRef}
          handleBlur={handleBlur}
          handleKeydown={handleKeydown}
          props={{ id, rows, className, style, name }}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    }
    return (
      <Textarea
        inputRef={inputRef}
        handleBlur={handleBlur}
        handleKeydown={handleKeydown}
        props={{ id, rows, className, style, name }}
        defaultValue={savedText}
      />
    );
  };

  return !readonly && editMode
    ? renderEditMode(value !== undefined)
    : renderDisplayMode();
}

EditTextarea.defaultProps = EditTextareaDefaultProps;
EditTextarea.propTypes = EditTextareaPropTypes;
