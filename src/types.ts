import type * as React from 'react';

export type inputTextType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface onSaveProps {
  /** `name` attribute of the input element */
  name: string;
  /** The saved value */
  value: string;
  /** The value before this edit started */
  previousValue: string;
}

/** Attributes the component manages itself, so they can't be set via `inputProps`. */
type ManagedInputAttributes =
  | 'id'
  | 'name'
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'placeholder'
  | 'className'
  | 'style'
  | 'children'
  | 'rows'
  | 'readOnly';

export interface SharedProps<
  E extends HTMLInputElement | HTMLTextAreaElement =
    HTMLInputElement | HTMLTextAreaElement
> {
  /** id attribute set on both the display and the input element */
  id?: string;
  /** name attribute set on the input element */
  name?: string;
  /** class attribute set on the display element */
  className?: string;
  /** class attribute set on the input element */
  inputClassName?: string;
  /** Controlled value of the input and text of the display element */
  value?: string;
  /** Initial value for an uncontrolled component */
  defaultValue?: string;
  /** Shown in the display element (and the input) when the value is empty */
  placeholder?: string;
  /**
   * Formats the value shown in the display element.
   * @default (value) => value
   */
  formatDisplayText?: (value: string) => React.ReactNode;
  /**
   * Called when the input is saved by pressing Enter (EditText only) or by
   * blurring the input, and only if the value changed.
   */
  onSave?: (data: onSaveProps) => void;
  /**
   * Called with the input's change event whenever its value changes,
   * including when Escape reverts the value.
   */
  onChange?: (event: React.ChangeEvent<E>) => void;
  /** Called when the component enters edit mode */
  onEditMode?: () => void;
  /** Called when the component leaves edit mode (save or cancel) */
  onBlur?: () => void;
  /** CSS style applied to both the display and the input element */
  style?: React.CSSProperties;
  /**
   * Only show the display element; edit mode can't be entered.
   * @default false
   */
  readOnly?: boolean;
  /** @deprecated Use `readOnly` instead. */
  readonly?: boolean;
}

export interface EditTextProps extends SharedProps<HTMLInputElement> {
  /**
   * type attribute of the input element
   * @default 'text'
   */
  type?: inputTextType;
  /**
   * Display the component inline
   * @default false
   */
  inline?: boolean;
  /**
   * Show an edit button that enters edit mode, instead of making the text
   * itself clickable
   * @default false
   */
  showEditButton?: boolean;
  /**
   * Content of the edit button
   * @default <EditIcon />
   */
  editButtonContent?: React.ReactNode;
  /** Props passed to the edit button element */
  editButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /**
   * Extra attributes passed to the input element, e.g. `maxLength`,
   * `autoComplete`, `required` or `aria-*`.
   */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ManagedInputAttributes
  >;
}

export interface EditTextareaProps extends SharedProps<HTMLTextAreaElement> {
  /**
   * Number of visible rows, or 'auto' to size the display element to its
   * content
   * @default 3
   */
  rows?: number | 'auto';
  /**
   * Extra attributes passed to the textarea element, e.g. `maxLength`,
   * `required` or `aria-*`.
   */
  inputProps?: Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    ManagedInputAttributes
  >;
}
