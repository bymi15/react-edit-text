import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { EditTextarea } from '.';

const getDisplay = () => screen.getByRole('button');
const getTextarea = () => screen.getByRole('textbox');
const queryTextarea = () => screen.queryByRole('textbox');

async function enterEditMode(user = userEvent.setup()) {
  await user.click(getDisplay());
  return getTextarea();
}

describe('EditTextarea', () => {
  test('clicking the display activates edit mode', async () => {
    const handleEditMode = vi.fn();
    render(<EditTextarea onEditMode={handleEditMode} />);
    expect(await enterEditMode()).toHaveFocus();
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });

  test('Enter inserts a newline instead of saving', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    render(<EditTextarea name='bio' onSave={handleSave} />);
    await enterEditMode(user);
    await user.keyboard('line 1{Enter}line 2');
    expect(getTextarea()).toHaveValue('line 1\nline 2');
    expect(handleSave).not.toHaveBeenCalled();
    fireEvent.blur(getTextarea());
    expect(handleSave).toHaveBeenCalledWith({
      name: 'bio',
      value: 'line 1\nline 2',
      previousValue: ''
    });
    expect(getDisplay()).toHaveTextContent('line 1 line 2');
  });

  test('blur does not call onSave when the value is unchanged', async () => {
    const handleSave = vi.fn();
    render(<EditTextarea defaultValue='same' onSave={handleSave} />);
    fireEvent.blur(await enterEditMode());
    expect(queryTextarea()).toBeNull();
    expect(handleSave).not.toHaveBeenCalled();
  });

  test('Escape cancels without saving and calls onBlur', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    const handleBlur = vi.fn();
    render(
      <EditTextarea
        defaultValue='original'
        onSave={handleSave}
        onBlur={handleBlur}
      />
    );
    await enterEditMode(user);
    await user.keyboard('changed{Escape}');
    expect(queryTextarea()).toBeNull();
    expect(getDisplay()).toHaveTextContent('original');
    expect(getDisplay()).toHaveFocus();
    expect(handleSave).not.toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('Escape on a controlled textarea reverts via onChange', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = React.useState('original');
      return (
        <EditTextarea
          name='bio'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    }
    render(<Controlled />);
    await enterEditMode(user);
    await user.keyboard('!!');
    expect(getTextarea()).toHaveValue('original!!');
    await user.keyboard('{Escape}');
    expect(getDisplay()).toHaveTextContent('original');
  });

  test('previousValue reflects defaultValue', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    render(
      <EditTextarea name='bio' defaultValue='before' onSave={handleSave} />
    );
    const textarea = await enterEditMode(user);
    await user.clear(textarea);
    await user.type(textarea, 'after');
    fireEvent.blur(textarea);
    expect(handleSave).toHaveBeenCalledWith({
      name: 'bio',
      value: 'after',
      previousValue: 'before'
    });
  });

  test('shows the placeholder when empty, the value otherwise', () => {
    const { rerender } = render(
      <EditTextarea placeholder='Empty' value='' onChange={() => {}} />
    );
    expect(getDisplay()).toHaveTextContent('Empty');
    rerender(
      <EditTextarea placeholder='Empty' value='full' onChange={() => {}} />
    );
    expect(getDisplay()).toHaveTextContent('full');
    expect(getDisplay()).not.toHaveTextContent('Empty');
  });

  test('formatDisplayText may return a React element', () => {
    render(
      <EditTextarea
        defaultValue='hello'
        formatDisplayText={(v) => <strong>{v.toUpperCase()}</strong>}
      />
    );
    expect(screen.getByText('HELLO').tagName).toBe('STRONG');
  });

  test('sizes the display from rows', () => {
    const { rerender } = render(<EditTextarea rows={2} />);
    expect(getDisplay()).toHaveStyle({ height: '64px' });
    rerender(<EditTextarea rows='auto' />);
    expect(getDisplay()).toHaveStyle({ height: 'auto' });
  });

  test('read-only shows only the display', async () => {
    const user = userEvent.setup();
    render(<EditTextarea defaultValue='fixed' readOnly />);
    expect(screen.queryByRole('button')).toBeNull();
    await user.click(screen.getByText('fixed'));
    expect(queryTextarea()).toBeNull();
  });

  test('passes inputProps and forwards the ref', async () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<EditTextarea ref={ref} rows={5} inputProps={{ maxLength: 10 }} />);
    const textarea = await enterEditMode();
    expect(textarea).toHaveAttribute('maxlength', '10');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(ref.current).toBe(textarea);
  });
});
