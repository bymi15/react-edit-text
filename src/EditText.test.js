import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { EditText } from '.';
import '@testing-library/jest-dom/extend-expect';

const displayComponentLabel = 'display component';
const inputComponentLabel = 'input component';

test('clicking on the component should activate edit mode', async () => {
  render(<EditText />);
  const div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  await userEvent.click(div);
  expect(screen.queryByLabelText(displayComponentLabel)).toBeNull();
  expect(screen.queryByLabelText(inputComponentLabel)).toBeTruthy();
});
test('pressing enter key should disable edit mode and trigger onSave', async () => {
  const handleSave = jest.fn();
  render(<EditText name='mockName' onSave={handleSave} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  await userEvent.type(input, 'mockValue', {
    skipClick: true
  });
  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
  });
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('mockValue');
  expect(handleSave).toHaveBeenCalledWith({
    name: 'mockName',
    value: 'mockValue',
    previousValue: ''
  });
});
test('pressing enter key should not trigger onSave if value is not changed', async () => {
  const handleSave = jest.fn();
  render(<EditText name='mockName' onSave={handleSave} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  await userEvent.type(input, 'a', {
    skipClick: true
  });
  await userEvent.type(input, '{backspace}', {
    skipClick: true
  });
  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
  });
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('');
  expect(handleSave).not.toHaveBeenCalled();
});
test('pressing ESC key should disable edit mode but should not trigger onSave', async () => {
  const handleSave = jest.fn();
  render(<EditText name='mockName' onSave={handleSave} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  await userEvent.type(input, 'mockValue', {
    skipClick: true
  });
  fireEvent.keyDown(input, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27
  });
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('');
  expect(handleSave).not.toHaveBeenCalled();
});
test('pressing ESC key should not trigger onSave if value is not changed', async () => {
  const handleSave = jest.fn();
  render(<EditText name='mockName' onSave={handleSave} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  await userEvent.type(input, 'a', {
    skipClick: true
  });
  await userEvent.type(input, '{backspace}', {
    skipClick: true
  });
  fireEvent.keyDown(input, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27
  });
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('');
  expect(handleSave).not.toHaveBeenCalled();
});
test('blur event should disable edit mode and trigger onSave', async () => {
  const handleSave = jest.fn();
  render(<EditText name='mockName' onSave={handleSave} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  await userEvent.type(input, 'mockValue', {
    skipClick: true
  });
  fireEvent.blur(input);
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('mockValue');
  expect(handleSave).toHaveBeenCalledWith({
    name: 'mockName',
    value: 'mockValue',
    previousValue: ''
  });
});
test('blur event should not trigger onSave if value is not changed', async () => {
  const handleSave = jest.fn();
  render(<EditText name='mockName' onSave={handleSave} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  fireEvent.blur(input);
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('');
  expect(handleSave).not.toHaveBeenCalled();
});
test('onSave callback should be triggered', async () => {
  const handleSave = jest.fn();
  render(
    <EditText name='mockName' defaultValue='mockValue' onSave={handleSave} />
  );
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  await userEvent.clear(input);
  fireEvent.blur(input);
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(div).toHaveTextContent('');
  expect(handleSave).toHaveBeenCalledWith({
    name: 'mockName',
    value: '',
    previousValue: 'mockValue'
  });
});
test('onEditMode callback should be triggered', async () => {
  const handleEditMode = jest.fn();
  render(
    <EditText name='mockName' value='mockValue' onEditMode={handleEditMode} />
  );
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  expect(handleEditMode).toHaveBeenCalledTimes(1);
});
test('onEditMode callback should not be triggered if already in edit mode', async () => {
  const handleEditMode = jest.fn();
  render(
    <EditText name='mockName' value='mockValue' onEditMode={handleEditMode} />
  );
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  await userEvent.click(input);
  expect(handleEditMode).toHaveBeenCalledTimes(1);
});
test('onBlur callback should be triggered on enter key press (in edit mode)', async () => {
  const handleBlur = jest.fn();
  render(<EditText name='mockName' value='mockValue' onBlur={handleBlur} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
  });
  expect(handleBlur).toHaveBeenCalledTimes(1);
});
test('onBlur callback should be triggered on escape key press (in edit mode)', async () => {
  const handleBlur = jest.fn();
  render(<EditText name='mockName' value='mockValue' onBlur={handleBlur} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  fireEvent.keyDown(input, {
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
    <EditText
      name='mockName'
      defaultValue='mockValueBefore'
      onSave={handleSave}
    />
  );
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  await userEvent.clear(input);
  await userEvent.type(input, 'mockValue');
  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
  });
  div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toBeTruthy();
  expect(handleSave).toHaveBeenCalledWith({
    name: 'mockName',
    value: 'mockValue',
    previousValue: 'mockValueBefore'
  });
});
test('should display placeholder if value is empty string', async () => {
  render(<EditText placeholder='mockPlaceholder' value='' />);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockPlaceholder'
  );
});
test('should display value instead of placeholder if value is not empty', async () => {
  render(<EditText placeholder='mockPlaceholder' value='mockValue' />);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockValue'
  );
  expect(screen.getByLabelText(displayComponentLabel)).not.toHaveTextContent(
    'mockPlaceholder'
  );
});
test('should display placeholder if value is changed to empty string', async () => {
  render(<EditText placeholder='mockPlaceholder' defaultValue='mockValue' />);
  let div = await screen.findByLabelText(displayComponentLabel);
  expect(div).toHaveTextContent('mockValue');
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  await userEvent.clear(input);
  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
  });
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockPlaceholder'
  );
});
test('should display value instead of placeholder if value is changed to non-empty string', async () => {
  render(<EditText placeholder='mockPlaceholder' defaultValue='' />);
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockPlaceholder'
  );
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  const input = screen.getByLabelText(inputComponentLabel);
  expect(input).toBeTruthy();
  await userEvent.type(input, 'mockValue', {
    skipClick: true
  });
  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
  });
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    'mockValue'
  );
});
test('should not display input when readonly', async () => {
  render(<EditText readonly />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  expect(screen.queryByLabelText(inputComponentLabel)).toBeNull();
  expect(screen.queryByLabelText(displayComponentLabel)).toBeTruthy();
});
test('should display input when not readonly', async () => {
  render(<EditText readonly={false} />);
  let div = await screen.findByLabelText(displayComponentLabel);
  await userEvent.click(div);
  expect(screen.queryByLabelText(inputComponentLabel)).toBeTruthy();
  expect(screen.queryByLabelText(displayComponentLabel)).toBeNull();
});
test('formatDisplayText should display value correctly based on passed in function', async () => {
  const formatDisplayText = jest.fn(
    (value) => '$' + Math.round(parseFloat(value))
  );
  render(
    <EditText
      id='test'
      name='mockName'
      type='number'
      value='1000.9'
      formatDisplayText={formatDisplayText}
    />
  );
  expect(formatDisplayText).toHaveBeenCalled();
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    '$1001'
  );
});
test('formatDisplayText should display defaultValue correctly based on passed in function', async () => {
  const formatDisplayText = jest.fn(
    (value) => '$' + Math.round(parseFloat(value))
  );
  render(
    <EditText
      id='test'
      name='mockName'
      type='number'
      defaultValue='1000.9'
      formatDisplayText={formatDisplayText}
    />
  );
  expect(formatDisplayText).toHaveBeenCalled();
  expect(screen.getByLabelText(displayComponentLabel)).toHaveTextContent(
    '$1001'
  );
});
