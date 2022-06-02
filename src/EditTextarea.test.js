import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { EditTextarea } from '.';
import '@testing-library/jest-dom/extend-expect';

const displayComponentLabel = 'display component';
const textareaComponentLabel = 'textarea component';

test('clicking on the component should activate edit mode', async () => {
  render(<EditTextarea />);
  const div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  await userEvent.click(div);
  expect(screen.queryByLabelText(displayComponentLabel)).toBeNull();
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeTruthy();
});
test('pressing ESC key should disable edit mode but should not trigger onSave', async () => {
  const handleSave = jest.fn();
  render(<EditTextarea name='mockName' onSave={handleSave} />);
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  await userEvent.type(textarea, 'mockValue', {
    skipClick: true
  });
  fireEvent.keyDown(textarea, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27
  });
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  expect(handleSave).not.toHaveBeenCalled();
});
test('blur event should disable edit mode and trigger onSave', async () => {
  const handleSave = jest.fn();
  render(<EditTextarea name='mockName' onSave={handleSave} />);
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  await userEvent.type(textarea, 'mockValue', {
    skipClick: true
  });
  fireEvent.blur(textarea);
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  expect(handleSave).toHaveBeenCalled();
});
test('blur event should not trigger onSave if value is not changed', async () => {
  const handleSave = jest.fn();
  render(<EditTextarea name='mockName' defaultValue='' onSave={handleSave} />);
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  fireEvent.blur(textarea);
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  expect(handleSave).not.toHaveBeenCalled();
});
test('onSave callback should be triggered', async () => {
  const handleSave = jest.fn();
  render(
    <EditTextarea
      name='mockName'
      defaultValue='mockValue'
      onSave={handleSave}
    />
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  await userEvent.clear(textarea);
  fireEvent.blur(textarea);
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  expect(handleSave).toHaveBeenCalled();
});
test('onEditMode callback should be triggered', async () => {
  const handleEditMode = jest.fn();
  render(
    <EditTextarea
      name='mockName'
      value='mockValue'
      onEditMode={handleEditMode}
    />
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.queryByLabelText(textareaComponentLabel);
  expect(textarea).toBeTruthy();
  expect(handleEditMode).toHaveBeenCalledTimes(1);
});
test('onEditMode callback should not be triggered if already in edit mode', async () => {
  const handleEditMode = jest.fn();
  render(
    <EditTextarea
      name='mockName'
      value='mockValue'
      onEditMode={handleEditMode}
    />
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.queryByLabelText(textareaComponentLabel);
  expect(textarea).toBeTruthy();
  await userEvent.click(textarea);
  expect(handleEditMode).toHaveBeenCalledTimes(1);
});
test('onBlur callback should be triggered on escape key press (in edit mode)', async () => {
  const handleBlur = jest.fn();
  render(
    <EditTextarea name='mockName' value='mockValue' onBlur={handleBlur} />
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.queryByLabelText(textareaComponentLabel);
  expect(textarea).toBeTruthy();
  fireEvent.keyDown(textarea, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27
  });
  expect(handleBlur).toHaveBeenCalledTimes(1);
});
test('onSave should return correct {name, value, previousValue} object with defaultValue prop set', async () => {
  const handleSave = jest.fn();
  render(
    <EditTextarea
      name='mockName'
      defaultValue='mockValueBefore'
      onSave={handleSave}
    />
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  await userEvent.clear(textarea);
  await userEvent.type(textarea, 'mockValue', {
    skipClick: true
  });
  fireEvent.blur(textarea);
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  expect(handleSave).toHaveBeenCalledWith({
    name: 'mockName',
    value: 'mockValue',
    previousValue: 'mockValueBefore'
  });
});
test('should display placeholder if value is empty string', async () => {
  render(<EditTextarea placeholder='mockPlaceholder' value='' />);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockPlaceholder'
  );
});
test('should display value instead of placeholder if value is not empty', async () => {
  render(<EditTextarea placeholder='mockPlaceholder' value='mockValue' />);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockValue'
  );
});
test('should display placeholder if value is changed to empty string', async () => {
  render(
    <EditTextarea placeholder='mockPlaceholder' defaultValue='mockValue' />
  );
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockValue'
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  await userEvent.clear(textarea);
  fireEvent.blur(textarea);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockPlaceholder'
  );
});
test('should display value instead of placeholder if value is changed to non-empty string', async () => {
  render(<EditTextarea placeholder='mockPlaceholder' defaultValue='' />);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockPlaceholder'
  );
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  const textarea = screen.getByLabelText(textareaComponentLabel);
  await userEvent.type(textarea, 'mockValue', {
    skipClick: true
  });
  fireEvent.blur(textarea);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockValue'
  );
});
test('should not display textarea when readonly', async () => {
  render(<EditTextarea readonly />);
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeNull();
  expect(screen.queryByLabelText(displayComponentLabel)).toBeTruthy();
});
test('should display textarea when not readonly', async () => {
  render(<EditTextarea readonly={false} />);
  await userEvent.click(screen.getByLabelText(displayComponentLabel));
  expect(screen.queryByLabelText(textareaComponentLabel)).toBeTruthy();
  expect(screen.queryByLabelText(displayComponentLabel)).toBeNull();
});
test('formatDisplayText should display value correctly based on passed in function', async () => {
  const formatDisplayText = jest.fn(() => 'formatTest\nformatTest');
  render(
    <EditTextarea
      id='test'
      name='mockName'
      value={'test\ntest\ntest'}
      formatDisplayText={formatDisplayText}
    />
  );
  expect(formatDisplayText).toHaveBeenCalled();
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'formatTest'
  );
});
test('formatDisplayText should display defaultValue correctly based on passed in function', async () => {
  const formatDisplayText = jest.fn(() => 'formatTest\nformatTest');
  render(
    <EditTextarea
      id='test'
      name='mockName'
      defaultValue={'test\ntest\ntest'}
      formatDisplayText={formatDisplayText}
    />
  );
  expect(formatDisplayText).toHaveBeenCalled();
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'formatTest'
  );
});
