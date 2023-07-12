import classnames from 'classnames';
import React from 'react';
import EditIcon from './components/EditIcon';
import Input from './components/Input';
import { EditTextPropTypes } from './propTypes';
import styles from './styles.module.css';

export default function EditText({
  id,
  name,
  className,
  placeholder = '',
  inline = false,
  style = {},
  readonly = false,
  type = 'text',
  value,
  defaultValue,
  formatDisplayText = (x) => x,
  onEditMode = () => {},
  onChange = () => {},
  onSave = () => {},
  onBlur = () => {},
  showEditButton = false,
  editButtonContent = <EditIcon />,
  editButtonProps = {},
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

  const handleClickDisplay = () => {
    if (readonly || showEditButton) return;
    setEditMode(true);
    onEditMode();
  };

  const handleClickEditButton = () => {
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
    if (e.keyCode === 13 || e.charCode === 13) {
      handleBlur();
    } else if (e.keyCode === 27 || e.charCode === 27) {
      handleBlur(false);
    }
  };

  const handleFocus = (e) => {
    if (type === 'text') {
      e.currentTarget.setSelectionRange(
        e.currentTarget.value.length,
        e.currentTarget.value.length
      );
    }
  };

  const renderDisplayMode = () => {
    return (
      <div
        className={classnames(styles.displayContainer, {
          [styles.inline]: inline
        })}
      >
        <div
          id={id}
          className={classnames(
            styles.label,
            styles.shared,
            {
              [styles.placeholder]: placeholder && !savedText,
              [styles.inline]: inline,
              [styles.readonly]: readonly || showEditButton
            },
            className
          )}
          onClick={handleClickDisplay}
          style={style}
          aria-label='display component'
        >
          {formatDisplayText(savedText) || placeholder}
        </div>
        {showEditButton && !readonly && (
          <button
            type='button'
            className={styles.editButton}
            {...editButtonProps}
            onClick={handleClickEditButton}
          >
            {editButtonContent}
          </button>
        )}
      </div>
    );
  };

  const renderEditMode = (controlled) => {
    const sharedProps = {
      inputRef: inputRef,
      handleBlur: handleBlur,
      handleKeydown: handleKeydown,
      handleFocus: handleFocus,
      props: { id, inline, style, type, name },
      ['aria-label']: 'input component'
    };
    return controlled ? (
      <Input
        {...sharedProps}
        value={value}
        onChange={(e) => {
          setChangeEvent(e);
          onChange(e);
        }}
        inputClassName={inputClassName}
      />
    ) : (
      <Input
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

EditText.propTypes = EditTextPropTypes;
