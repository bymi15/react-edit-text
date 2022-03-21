import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, shallow } from 'enzyme';
import React from 'react';
import { EditText } from '.';
configure({ adapter: new Adapter() });

const divSelector = 'div.displayContainer > div';
const shallowInputSelector = 'Input';
const inputSelector = 'input';

describe('EditText', () => {
  it('clicking on the component should activate edit mode', () => {
    const component = shallow(<EditText />);
    const div = component.find(divSelector);
    expect(div).toHaveLength(1);
    expect(component.find(shallowInputSelector)).toEqual({});
    div.first().simulate('click');
    expect(div).toEqual({});
    expect(component.find(shallowInputSelector)).toHaveLength(1);
  });
  it('pressing enter key should disable edit mode and trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    const div = component.find(divSelector);
    expect(div).toHaveLength(1);
    expect(div.text()).toEqual('mockValue');
    expect(handleSave).toHaveBeenCalled();
  });
  it('pressing enter key should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.simulate('keydown', { keyCode: 13 });
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('pressing ESC key should disable edit mode but should not trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 27 });
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('pressing ESC key should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.simulate('keydown', { keyCode: 27 });
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('blur event should disable edit mode and trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = 'mockValue';
    input.simulate('blur');
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleSave).toHaveBeenCalled();
  });
  it('blur event should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.simulate('blur');
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('onSave callback should be triggered', () => {
    const handleSave = jest.fn();
    const handleChange = jest.fn();
    const component = mount(
      <EditText
        name='mockName'
        value='mockValue'
        onSave={handleSave}
        onChange={handleChange}
      />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = '';
    input.simulate('blur');
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleSave).toHaveBeenCalled();
  });
  it('onChange callback should be triggered', () => {
    const handleSave = jest.fn();
    const handleChange = jest.fn();
    const component = mount(
      <EditText
        name='mockName'
        value='mockValue'
        onSave={handleSave}
        onChange={handleChange}
      />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.simulate('change', { target: { value: '' } });
    input.simulate('blur');
    expect(component.find(divSelector)).toHaveLength(1);
    expect(handleChange).toHaveBeenCalled();
  });
  it('onEditMode callback should be triggered', () => {
    const handleEditMode = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onEditMode={handleEditMode} />
    );
    component.find(divSelector).first().simulate('click');
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });
  it('onEditMode callback should not be triggered if already in edit mode', () => {
    const handleEditMode = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onEditMode={handleEditMode} />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.first().simulate('click');
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });
  it('onBlur callback should be triggered on enter key press (in edit mode)', () => {
    const handleBlur = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onBlur={handleBlur} />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.simulate('keydown', { keyCode: 13 });
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  it('onBlur callback should be triggered on escape key press (in edit mode)', () => {
    const handleBlur = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onBlur={handleBlur} />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.simulate('keydown', { keyCode: 27 });
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  it('onSave should return correct {name, value, previousValue} object with defaultValue prop set', () => {
    let resName, resValue, resPreviousValue;
    const handleSave = ({ name, value, previousValue }) => {
      resName = name;
      resValue = value;
      resPreviousValue = previousValue;
    };
    const component = mount(
      <EditText
        name='mockName'
        defaultValue='mockValueBefore'
        onSave={handleSave}
      />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.find(divSelector)).toHaveLength(1);
    expect(resName).toEqual('mockName');
    expect(resValue).toEqual('mockValue');
    expect(resPreviousValue).toEqual('mockValueBefore');
  });
  it('onSave should return correct {name, value, previousValue} object with value and onChange props set', () => {
    let resName, resValue, resPreviousValue;
    const handleSave = ({ name, value, previousValue }) => {
      resName = name;
      resValue = value;
      resPreviousValue = previousValue;
    };
    const component = mount(
      <EditText name='mockName' value='mockValueBefore' onSave={handleSave} />
    );
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.find(divSelector)).toHaveLength(1);
    expect(resName).toEqual('mockName');
    expect(resValue).toEqual('mockValue');
    expect(resPreviousValue).toEqual('mockValueBefore');
  });
  it('should display placeholder if value is empty string', () => {
    const component = mount(
      <EditText placeholder='mockPlaceholder' value='' />
    );
    expect(component.contains('mockPlaceholder')).toEqual(true);
  });
  it('should display value instead of placeholder if value is not empty', () => {
    const component = mount(
      <EditText placeholder='mockPlaceholder' value='mockValue' />
    );
    expect(component.contains('mockValue')).toEqual(true);
  });
  it('should display placeholder if value is changed to empty string', () => {
    const component = mount(
      <EditText placeholder='mockPlaceholder' defaultValue='mockValue' />
    );
    expect(component.contains('mockValue')).toEqual(true);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = '';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.contains('mockPlaceholder')).toEqual(true);
  });
  it('should display value instead of placeholder if value is changed to non-empty string', () => {
    const component = mount(
      <EditText placeholder='mockPlaceholder' defaultValue='' />
    );
    expect(component.contains('mockPlaceholder')).toEqual(true);
    component.find(divSelector).first().simulate('click');
    const input = component.find(inputSelector);
    expect(input).toHaveLength(1);
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.contains('mockValue')).toEqual(true);
  });
  it('should not display input when readonly', () => {
    const component = mount(<EditText readonly />);
    component.find(divSelector).first().simulate('click');
    expect(component.exists('input')).toEqual(false);
  });
  it('should display input when not readonly', () => {
    const component = mount(<EditText readonly={false} />);
    component.find(divSelector).first().simulate('click');
    expect(component.exists('input')).toEqual(true);
  });
  it('formatDisplayText should display value correctly based on passed in function', () => {
    const formatDisplayText = jest.fn(
      (value) => '$' + Math.round(parseFloat(value))
    );
    const component = mount(
      <EditText
        id='test'
        name='mockName'
        type='number'
        value='1000.9'
        formatDisplayText={formatDisplayText}
      />
    );
    const displayText = component.find('#test');
    expect(formatDisplayText).toHaveBeenCalled();
    expect(displayText.first().text().trim().includes('$1001')).toEqual(true);
  });
  it('formatDisplayText should display defaultValue correctly based on passed in function', () => {
    const formatDisplayText = jest.fn(
      (value) => '$' + Math.round(parseFloat(value))
    );
    const component = mount(
      <EditText
        id='test'
        name='mockName'
        type='number'
        defaultValue='1000.9'
        formatDisplayText={formatDisplayText}
      />
    );
    const displayText = component.find('#test');
    expect(formatDisplayText).toHaveBeenCalled();
    expect(displayText.first().text().trim().includes('$1001')).toEqual(true);
  });
});
