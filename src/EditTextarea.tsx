import * as React from 'react';
import { cx } from './cx';
import styles from './styles.module.css';
import type { EditTextareaProps } from './types';
import { useEditable } from './useEditable';

const identity = (value: string): React.ReactNode => value;

const EditTextarea = React.forwardRef<HTMLTextAreaElement, EditTextareaProps>(
  function EditTextarea(
    {
      id,
      rows = 3,
      name,
      className,
      inputClassName,
      placeholder = '',
      style,
      readOnly,
      readonly,
      value,
      defaultValue,
      formatDisplayText = identity,
      onEditMode,
      onChange,
      onSave,
      onBlur,
      inputProps,
      editOnDoubleClick = false
    },
    ref
  ) {
    const isReadOnly = readOnly ?? readonly ?? false;
    const editable = useEditable<HTMLTextAreaElement>({
      value,
      defaultValue,
      readOnly: isReadOnly,
      saveOnEnter: false,
      onSave,
      onEditMode,
      onBlur,
      forwardedRef: ref
    });

    if (editable.isEditing) {
      return (
        <textarea
          {...inputProps}
          {...editable.getInputHandlers(inputProps)}
          ref={editable.setInputRef}
          id={id}
          name={name}
          rows={typeof rows === 'number' ? rows : undefined}
          placeholder={placeholder}
          className={cx(styles.shared, inputClassName)}
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
    const isClickable = !isReadOnly;
    const fallbackLabel =
      isClickable && showPlaceholder && !placeholder
        ? (inputProps?.['aria-label'] ?? 'Edit')
        : undefined;

    return (
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
          styles.shared,
          styles.textareaView,
          showPlaceholder && styles.placeholder,
          !isClickable && styles.readonly,
          className
        )}
        style={{
          ...style,
          height: rows === 'auto' ? 'auto' : `${rows * 24 + 16}px`
        }}
      >
        {showPlaceholder ? placeholder : formatted}
      </div>
    );
  }
);

export default EditTextarea;
