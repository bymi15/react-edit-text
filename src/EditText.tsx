import * as React from 'react';
import EditIcon from './components/EditIcon';
import { cx } from './cx';
import styles from './styles.module.css';
import type { EditTextProps } from './types';
import { useEditable } from './useEditable';

const identity = (value: string): React.ReactNode => value;

const EditText = React.forwardRef<HTMLInputElement, EditTextProps>(
  function EditText(
    {
      id,
      name,
      className,
      inputClassName,
      placeholder = '',
      inline = false,
      style,
      readOnly,
      readonly,
      type = 'text',
      value,
      defaultValue,
      formatDisplayText = identity,
      onEditMode,
      onChange,
      onSave,
      onBlur,
      showEditButton = false,
      editButtonContent = <EditIcon />,
      editButtonProps,
      inputProps,
      editOnDoubleClick = false
    },
    ref
  ) {
    const isReadOnly = readOnly ?? readonly ?? false;
    const editable = useEditable<HTMLInputElement>({
      value,
      defaultValue,
      readOnly: isReadOnly,
      saveOnEnter: true,
      onSave,
      onEditMode,
      onBlur,
      forwardedRef: ref
    });

    if (editable.isEditing) {
      return (
        <input
          {...inputProps}
          {...editable.getInputHandlers(inputProps)}
          ref={editable.setInputRef}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cx(styles.shared, inline && styles.inline, inputClassName)}
          style={style}
          onChange={onChange}
          {...(editable.isControlled
            ? { value }
            : { defaultValue: editable.text })}
        />
      );
    }

    const formatted = formatDisplayText(editable.text);
    const showPlaceholder =
      formatted === '' || formatted === null || formatted === undefined;
    const isClickable = !isReadOnly && !showEditButton;
    // A role="button" needs an accessible name even when nothing is shown.
    const fallbackLabel =
      isClickable && showPlaceholder && !placeholder
        ? (inputProps?.['aria-label'] ?? 'Edit')
        : undefined;

    return (
      <div className={cx(styles.displayContainer, inline && styles.inline)}>
        <div
          id={id}
          ref={isClickable ? editable.setFocusReturnRef : undefined}
          role={isClickable ? 'button' : undefined}
          tabIndex={isClickable ? 0 : undefined}
          aria-label={fallbackLabel}
          {...(isClickable &&
            editable.getDisplayClickHandlers(editOnDoubleClick))}
          onKeyDown={isClickable ? editable.handleDisplayKeyDown : undefined}
          className={cx(
            styles.label,
            styles.shared,
            showPlaceholder && styles.placeholder,
            inline && styles.inline,
            !isClickable && styles.readonly,
            className
          )}
          style={style}
        >
          {showPlaceholder ? placeholder : formatted}
        </div>
        {showEditButton && !isReadOnly && (
          <button
            type='button'
            aria-label='Edit'
            className={styles.editButton}
            {...editButtonProps}
            ref={editable.setFocusReturnRef}
            onClick={(e) => {
              editButtonProps?.onClick?.(e);
              editable.startEditing();
            }}
          >
            {editButtonContent}
          </button>
        )}
      </div>
    );
  }
);

export default EditText;
