import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { EditText, EditTextarea, type EditTextProps } from '.';

const getDisplay = () => screen.getByRole('button');
const getInput = () => screen.getByRole('textbox');
const queryInput = () => screen.queryByRole('textbox');

async function enterEditMode(user = userEvent.setup()) {
  await user.click(getDisplay());
  return getInput();
}

describe('edit mode', () => {
  test('clicking the display activates edit mode', async () => {
    render(<EditText />);
    expect(queryInput()).toBeNull();
    const input = await enterEditMode();
    expect(input).toHaveFocus();
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('onEditMode is called once, not again when clicking the input', async () => {
    const user = userEvent.setup();
    const handleEditMode = vi.fn();
    render(<EditText defaultValue='hi' onEditMode={handleEditMode} />);
    const input = await enterEditMode(user);
    await user.click(input);
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });

  test('passes the placeholder to the input', async () => {
    render(<EditText placeholder='Type a name' />);
    expect(await enterEditMode()).toHaveAttribute('placeholder', 'Type a name');
  });

  test('does not throw entering edit mode for types without selection', async () => {
    render(<EditText type='email' defaultValue='a@b.co' />);
    expect(await enterEditMode()).toHaveValue('a@b.co');
  });
});

describe('saving', () => {
  test('Enter saves and calls onSave with name, value and previousValue', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    render(<EditText name='title' onSave={handleSave} />);
    await enterEditMode(user);
    await user.keyboard('hello{Enter}');
    expect(queryInput()).toBeNull();
    expect(getDisplay()).toHaveTextContent('hello');
    expect(handleSave).toHaveBeenCalledWith({
      name: 'title',
      value: 'hello',
      previousValue: ''
    });
  });

  test('Enter does not call onSave when the value is unchanged', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    render(<EditText name='title' onSave={handleSave} />);
    await enterEditMode(user);
    await user.keyboard('a{Backspace}{Enter}');
    expect(queryInput()).toBeNull();
    expect(handleSave).not.toHaveBeenCalled();
  });

  test('blur saves', async () => {
    const handleSave = vi.fn();
    render(<EditText name='title' defaultValue='before' onSave={handleSave} />);
    const user = userEvent.setup();
    const input = await enterEditMode(user);
    await user.clear(input);
    fireEvent.blur(input);
    expect(getDisplay()).toHaveTextContent('');
    expect(handleSave).toHaveBeenCalledWith({
      name: 'title',
      value: '',
      previousValue: 'before'
    });
  });

  test('blur does not call onSave when the value is unchanged', async () => {
    const handleSave = vi.fn();
    render(<EditText name='title' onSave={handleSave} />);
    fireEvent.blur(await enterEditMode());
    expect(queryInput()).toBeNull();
    expect(handleSave).not.toHaveBeenCalled();
  });

  test('previousValue reflects defaultValue', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    render(<EditText name='title' defaultValue='before' onSave={handleSave} />);
    const input = await enterEditMode(user);
    await user.clear(input);
    await user.keyboard('after{Enter}');
    expect(handleSave).toHaveBeenCalledWith({
      name: 'title',
      value: 'after',
      previousValue: 'before'
    });
  });

  test('onSave and onBlur fire once even if a blur follows Enter', async () => {
    const handleSave = vi.fn();
    const handleBlur = vi.fn();
    render(<EditText onSave={handleSave} onBlur={handleBlur} />);
    const user = userEvent.setup();
    const input = await enterEditMode(user);
    await user.type(input, 'x');
    // Same batch: the input is still mounted when the blur arrives, as when
    // a browser fires blur on removing the focused element.
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.blur(input);
    });
    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('Enter during IME composition does not save', async () => {
    const handleSave = vi.fn();
    render(<EditText onSave={handleSave} />);
    const user = userEvent.setup();
    const input = await enterEditMode(user);
    await user.type(input, 'にほん');
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 229 });
    expect(getInput()).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleSave).toHaveBeenCalledTimes(1);
  });
});

describe('cancelling', () => {
  test('Escape exits edit mode without saving and restores the text', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    const handleBlur = vi.fn();
    render(
      <EditText
        defaultValue='original'
        onSave={handleSave}
        onBlur={handleBlur}
      />
    );
    await enterEditMode(user);
    await user.keyboard('changed{Escape}');
    expect(queryInput()).toBeNull();
    expect(getDisplay()).toHaveTextContent('original');
    expect(handleSave).not.toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('Escape on a controlled input reverts via a real change event with target.name', async () => {
    const user = userEvent.setup();
    const events: Array<{ name: string; value: string }> = [];
    function Form() {
      const [form, setForm] = React.useState({ title: 'original' });
      return (
        <>
          <EditText
            name='title'
            value={form.title}
            onChange={(e) => {
              events.push({ name: e.target.name, value: e.target.value });
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
          />
          <output>{JSON.stringify(form)}</output>
        </>
      );
    }
    render(<Form />);
    await enterEditMode(user);
    await user.keyboard('!{Escape}');
    expect(events.at(-1)).toEqual({ name: 'title', value: 'original' });
    expect(screen.getByRole('status')).toHaveTextContent(
      '{"title":"original"}'
    );
    expect(getDisplay()).toHaveTextContent('original');
  });

  test('Escape does not call onChange when nothing changed', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<EditText value='same' onChange={handleChange} />);
    await enterEditMode(user);
    await user.keyboard('{Escape}');
    expect(handleChange).not.toHaveBeenCalled();
  });
});

describe('controlled and uncontrolled', () => {
  test('onChange fires while typing in an uncontrolled component', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<EditText onChange={handleChange} />);
    await enterEditMode(user);
    await user.keyboard('ab');
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange.mock.calls[1][0].target.value).toBe('ab');
  });

  test('display follows the controlled value', () => {
    const { rerender } = render(<EditText value='one' onChange={() => {}} />);
    expect(getDisplay()).toHaveTextContent('one');
    rerender(<EditText value='two' onChange={() => {}} />);
    expect(getDisplay()).toHaveTextContent('two');
  });

  test('adopts a new defaultValue', () => {
    const { rerender } = render(<EditText defaultValue='one' />);
    rerender(<EditText defaultValue='two' />);
    expect(getDisplay()).toHaveTextContent('two');
  });
});

describe('display', () => {
  test('shows the placeholder when the value is empty', () => {
    render(<EditText placeholder='Empty' value='' onChange={() => {}} />);
    expect(getDisplay()).toHaveTextContent('Empty');
  });

  test('shows the value instead of the placeholder', () => {
    render(<EditText placeholder='Empty' value='full' onChange={() => {}} />);
    expect(getDisplay()).toHaveTextContent('full');
    expect(getDisplay()).not.toHaveTextContent('Empty');
  });

  test('shows the placeholder after the value is cleared', async () => {
    const user = userEvent.setup();
    render(<EditText placeholder='Empty' defaultValue='full' />);
    await user.clear(await enterEditMode(user));
    await user.keyboard('{Enter}');
    expect(getDisplay()).toHaveTextContent('Empty');
  });

  test('formatDisplayText formats the value and defaultValue', () => {
    const format = (v: string) => '$' + Math.round(parseFloat(v));
    const { unmount } = render(
      <EditText value='1000.9' onChange={() => {}} formatDisplayText={format} />
    );
    expect(getDisplay()).toHaveTextContent('$1001');
    unmount();
    render(<EditText defaultValue='1000.9' formatDisplayText={format} />);
    expect(getDisplay()).toHaveTextContent('$1001');
  });
});

describe('readOnly', () => {
  test.each<[string, EditTextProps]>([
    ['readOnly', { readOnly: true }],
    ['deprecated readonly', { readonly: true }]
  ])('%s shows only the display', async (_, props) => {
    const user = userEvent.setup();
    render(<EditText defaultValue='fixed' {...props} />);
    expect(screen.queryByRole('button')).toBeNull();
    await user.click(screen.getByText('fixed'));
    expect(queryInput()).toBeNull();
  });

  test('becoming read-only while editing exits edit mode', async () => {
    const { rerender } = render(<EditText defaultValue='x' />);
    await enterEditMode();
    rerender(<EditText defaultValue='x' readOnly />);
    expect(queryInput()).toBeNull();
    rerender(<EditText defaultValue='x' />);
    expect(queryInput()).toBeNull();
  });
});

describe('accessibility', () => {
  test('the display is a focusable button named by its text', () => {
    render(<EditText defaultValue='Jane Doe' />);
    const display = screen.getByRole('button', { name: 'Jane Doe' });
    expect(display).toHaveAttribute('tabindex', '0');
  });

  test('an empty display without placeholder still has a name', () => {
    render(<EditText />);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  test.each(['{Enter}', ' '])(
    'keyboard: Tab then %s enters edit mode',
    async (key) => {
      const user = userEvent.setup();
      render(<EditText defaultValue='text' />);
      await user.tab();
      expect(getDisplay()).toHaveFocus();
      await user.keyboard(key);
      expect(getInput()).toHaveFocus();
    }
  );

  test.each(['{Enter}', '{Escape}'])(
    'focus returns to the display after %s',
    async (key) => {
      const user = userEvent.setup();
      render(<EditText defaultValue='text' />);
      await user.tab();
      await user.keyboard('{Enter}');
      await user.keyboard(key);
      expect(getDisplay()).toHaveFocus();
    }
  );

  test('blurring by clicking elsewhere does not steal focus back', async () => {
    const user = userEvent.setup();
    render(
      <>
        <EditText defaultValue='text' />
        <input aria-label='other' />
      </>
    );
    await user.click(getDisplay());
    expect(screen.getByDisplayValue('text')).toHaveFocus();
    await user.click(screen.getByRole('textbox', { name: 'other' }));
    expect(screen.getByRole('button', { name: 'text' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'other' })).toHaveFocus();
  });

  test('a <label htmlFor> names the input', async () => {
    render(
      <>
        <label htmlFor='title'>Title</label>
        <EditText id='title' defaultValue='x' />
      </>
    );
    await enterEditMode();
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
  });
});

describe('edit button', () => {
  test('enters edit mode; the display itself is not clickable', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <EditText
        defaultValue='text'
        showEditButton
        editButtonProps={{ onClick }}
      />
    );
    await user.click(screen.getByText('text'));
    expect(queryInput()).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(getInput()).toHaveFocus();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('accessible name can be overridden and focus returns to it', async () => {
    const user = userEvent.setup();
    render(
      <EditText
        defaultValue='text'
        showEditButton
        editButtonProps={{ 'aria-label': 'Edit title' }}
      />
    );
    const button = screen.getByRole('button', { name: 'Edit title' });
    await user.click(button);
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Edit title' })).toHaveFocus();
  });

  test('is hidden when read-only', () => {
    render(<EditText showEditButton readOnly />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('inputProps and ref', () => {
  test('passes extra attributes to the input', async () => {
    render(
      <EditText inputProps={{ maxLength: 5, 'aria-label': 'Nickname' }} />
    );
    expect(
      screen.getByRole('button', { name: 'Nickname' })
    ).toBeInTheDocument();
    const input = await enterEditMode();
    expect(input).toHaveAttribute('maxlength', '5');
    expect(input).toHaveAccessibleName('Nickname');
  });

  test('composes consumer key handlers, which can prevent saving', async () => {
    const handleSave = vi.fn();
    const onKeyDown = vi.fn((e: React.KeyboardEvent) => {
      if (e.key === 'Enter') e.preventDefault();
    });
    render(<EditText onSave={handleSave} inputProps={{ onKeyDown }} />);
    const user = userEvent.setup();
    await enterEditMode(user);
    await user.keyboard('x{Enter}');
    expect(onKeyDown).toHaveBeenCalled();
    expect(getInput()).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
  });

  test('forwards the ref to the input element', async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<EditText ref={ref} />);
    expect(ref.current).toBeNull();
    const input = await enterEditMode();
    expect(ref.current).toBe(input);
  });

  test('supports callback refs', async () => {
    const ref = vi.fn();
    render(<EditText ref={ref} />);
    const input = await enterEditMode();
    expect(ref).toHaveBeenLastCalledWith(input);
  });
});

describe('editOnDoubleClick', () => {
  test('single click does not edit; double click does', async () => {
    const user = userEvent.setup();
    const handleEditMode = vi.fn();
    render(
      <EditText
        defaultValue='text'
        editOnDoubleClick
        onEditMode={handleEditMode}
      />
    );
    await user.click(getDisplay());
    expect(queryInput()).toBeNull();
    await user.dblClick(getDisplay());
    expect(getInput()).toHaveFocus();
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });

  test('screen reader activation (click with detail 0) still edits', () => {
    render(<EditText defaultValue='text' editOnDoubleClick />);
    fireEvent.click(getDisplay(), { detail: 0 });
    expect(getInput()).toBeInTheDocument();
  });

  test('keyboard activation still edits', async () => {
    const user = userEvent.setup();
    render(<EditText defaultValue='text' editOnDoubleClick />);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(getInput()).toHaveFocus();
  });

  test('works for EditTextarea and is ignored when read-only', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <EditText defaultValue='x' editOnDoubleClick readOnly />
    );
    await user.dblClick(screen.getByText('x'));
    expect(queryInput()).toBeNull();
    unmount();
    render(<EditTextarea defaultValue='y' editOnDoubleClick />);
    await user.click(getDisplay());
    expect(queryInput()).toBeNull();
    await user.dblClick(getDisplay());
    expect(getInput()).toBeInTheDocument();
  });
});
