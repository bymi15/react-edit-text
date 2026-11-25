import * as React from 'react';
import type { SharedProps } from './types';

type EditableElement = HTMLInputElement | HTMLTextAreaElement;

// Input types whose selection can be set; setSelectionRange throws on others.
const SELECTABLE_INPUT_TYPES = new Set([
  'text',
  'search',
  'url',
  'tel',
  'password'
]);

/**
 * Sets the element's value through the native setter and dispatches an
 * `input` event, so React calls `onChange` with a real ChangeEvent (with
 * `target.name`, `target.id` etc.) rather than a hand-built imitation.
 */
function setNativeValue(element: EditableElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(element),
    'value'
  )?.set;
  setter?.call(element, value);
  const EventCtor = element.ownerDocument.defaultView?.Event ?? Event;
  element.dispatchEvent(new EventCtor('input', { bubbles: true }));
}

function assignRef<T>(ref: React.ForwardedRef<T>, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

type UserHandlers<E extends EditableElement> = Pick<
  React.HTMLAttributes<E>,
  'onKeyDown' | 'onBlur' | 'onFocus'
>;

interface UseEditableOptions<E extends EditableElement> extends Pick<
  SharedProps<E>,
  'value' | 'defaultValue' | 'onSave' | 'onEditMode' | 'onBlur'
> {
  readOnly: boolean;
  saveOnEnter: boolean;
  forwardedRef: React.ForwardedRef<E>;
}

export function useEditable<E extends EditableElement>({
  value,
  defaultValue,
  readOnly,
  saveOnEnter,
  onSave,
  onEditMode,
  onBlur,
  forwardedRef
}: UseEditableOptions<E>) {
  const isControlled = value !== undefined;
  const [savedText, setSavedText] = React.useState(defaultValue ?? '');
  const [editMode, setEditMode] = React.useState(false);

  // Adopt a new defaultValue when the prop changes (matches v5 behaviour).
  const [lastDefaultValue, setLastDefaultValue] = React.useState(defaultValue);
  if (defaultValue !== lastDefaultValue) {
    setLastDefaultValue(defaultValue);
    if (defaultValue !== undefined) setSavedText(defaultValue);
  }

  // Leave edit mode if the component becomes read-only while editing.
  if (readOnly && editMode) setEditMode(false);

  const text = isControlled ? value : savedText;

  const inputRef = React.useRef<E | null>(null);
  const focusReturnRef = React.useRef<HTMLElement | null>(null);
  const setFocusReturnRef = React.useCallback((node: HTMLElement | null) => {
    focusReturnRef.current = node;
  }, []);
  const previousValueRef = React.useRef('');
  // Guards against finishing twice, e.g. Enter followed by the blur that
  // some browsers fire when the focused input unmounts.
  const isEditingRef = React.useRef(false);
  const shouldReturnFocusRef = React.useRef(false);

  const setInputRef = React.useCallback(
    (node: E | null) => {
      inputRef.current = node;
      assignRef(forwardedRef, node);
    },
    [forwardedRef]
  );

  React.useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    } else if (shouldReturnFocusRef.current) {
      // Keyboard users who saved/cancelled get focus back on the control
      // they started from instead of losing it to <body>.
      shouldReturnFocusRef.current = false;
      focusReturnRef.current?.focus();
    }
  }, [editMode]);

  const startEditing = () => {
    if (readOnly || editMode) return;
    previousValueRef.current = text;
    isEditingRef.current = true;
    setEditMode(true);
    onEditMode?.();
  };

  const finishEditing = (save: boolean, fromKeyboard: boolean) => {
    const input = inputRef.current;
    if (!isEditingRef.current || !input) return;
    isEditingRef.current = false;

    const previousValue = previousValueRef.current;
    if (input.value !== previousValue) {
      if (save) {
        if (!isControlled) setSavedText(input.value);
        onSave?.({ name: input.name, value: input.value, previousValue });
      } else {
        setNativeValue(input, previousValue);
      }
    }
    shouldReturnFocusRef.current = fromKeyboard;
    setEditMode(false);
    onBlur?.();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<E>) => {
    // Enter while an IME composition is active (e.g. Japanese, Chinese,
    // Korean input) confirms the composition; it must not save. Safari
    // reports these as keyCode 229 with isComposing false.
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      finishEditing(false, true);
    } else if (e.key === 'Enter' && saveOnEnter) {
      e.preventDefault();
      finishEditing(true, true);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<E>) => {
    const el = e.currentTarget;
    if (el instanceof HTMLInputElement && !SELECTABLE_INPUT_TYPES.has(el.type))
      return;
    el.setSelectionRange(el.value.length, el.value.length);
  };

  /** Event handlers for the input, composed with any the consumer passed. */
  const getInputHandlers = (user: UserHandlers<E> = {}) => ({
    onKeyDown: (e: React.KeyboardEvent<E>) => {
      user.onKeyDown?.(e);
      if (!e.defaultPrevented) handleInputKeyDown(e);
    },
    onFocus: (e: React.FocusEvent<E>) => {
      user.onFocus?.(e);
      handleInputFocus(e);
    },
    onBlur: (e: React.FocusEvent<E>) => {
      user.onBlur?.(e);
      finishEditing(true, false);
    }
  });

  const handleDisplayKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startEditing();
    }
  };

  return {
    isEditing: editMode && !readOnly,
    text,
    isControlled,
    setInputRef,
    setFocusReturnRef,
    startEditing,
    getInputHandlers,
    handleDisplayKeyDown
  };
}
