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
  onBlur,
  inputClassName
}) {
  const inputRef = React.useRef(null);
  const [changeEvent, setChangeEvent] = React.useState({});
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
      const { name: inputName, value: inputValue } = inputRef.current;
      if (save && previousValue !== inputValue) {
        onSave({
          name: inputName,
          value: inputValue,
          previousValue: previousValue
        });
        setSavedText(inputValue);
        setPreviousValue(inputValue);
      } else if (!save) {
        onChange({
          ...changeEvent,
          target: changeEvent.target
            ? { ...changeEvent.target, value: previousValue }
            : { value: previousValue }
        });
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
        style={{
          ...style,
          height: rows === 'auto' ? 'auto' : `${rows * 24 + 16}px`
        }}
        aria-label='display component'
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
    const sharedProps = {
      inputRef: inputRef,
      handleBlur: handleBlur,
      handleKeydown: handleKeydown,
      props: { id, rows, style, name },
      ['aria-label']: 'textarea component'
    };
    return controlled ? (
      <Textarea
        {...sharedProps}
        value={value}
        onChange={(e) => {
          setChangeEvent(e);
          onChange(e);
        }}
        inputClassName={inputClassName}
      />
    ) : (
      <Textarea
        {...sharedProps}
        defaultValue={savedText}
        inputClassName={inputClassName}
      />
    );
  };

  return !readonly && editMode
    ? renderEditMode(value !== undefined && onChange !== undefined)
    : renderDisplayMode();
}

EditTextarea.defaultProps = EditTextareaDefaultProps;
EditTextarea.propTypes = EditTextareaPropTypes;
