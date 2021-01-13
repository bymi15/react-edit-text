import React from 'react';
import { EditText, EditTextarea } from '.';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EditText', () => {
  it('clicking on the component should activate edit mode', () => {
    const component = mount(<EditText />);
    expect(component.state().editMode).toEqual(false);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
  });
  it('pressing enter key should disable edit mode and trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).toHaveBeenCalled();
  });
  it('pressing enter key should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('keydown', { keyCode: 13 });
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('pressing ESC key should disable edit mode but should not trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 27 });
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('pressing ESC key should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('keydown', { keyCode: 27 });
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('blur event should disable edit mode and trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).toHaveBeenCalled();
  });
  it('blur event should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('onSave and onChange callbacks should be triggered', () => {
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
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('change', { target: { value: '' } });
    input.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });
  it('onSave should return correct {name, value} object', () => {
    let resName, resValue;
    const handleSave = ({ name, value }) => {
      resName = name;
      resValue = value;
    };
    const component = mount(<EditText name='mockName' onSave={handleSave} />);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.state().editMode).toEqual(false);
    expect(resName).toEqual('mockName');
    expect(resValue).toEqual('mockValue');
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
    component.simulate('click');
    const input = component.find('input');
    input.instance().value = '';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.contains('mockPlaceholder')).toEqual(true);
  });
  it('should display value instead of placeholder if value is changed to non-empty string', () => {
    const component = mount(
      <EditText placeholder='mockPlaceholder' defaultValue='' />
    );
    expect(component.contains('mockPlaceholder')).toEqual(true);
    component.simulate('click');
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.contains('mockValue')).toEqual(true);
  });
  it('should not display input when readonly', () => {
    const component = mount(<EditText readonly />);
    component.simulate('click');
    expect(component.exists('input')).toEqual(false);
  });
  it('should not display input when not readonly', () => {
    const component = mount(<EditText readonly={false} />);
    component.simulate('click');
    expect(component.exists('input')).toEqual(true);
  });
});

describe('EditTextarea', () => {
  it('clicking on the component should activate edit mode', () => {
    const component = mount(<EditTextarea />);
    expect(component.state().editMode).toEqual(false);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
  });
  it('pressing ESC key should disable edit mode but should not trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(
      <EditTextarea name='mockName' onSave={handleSave} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.instance().value = 'mockValue';
    textarea.simulate('keydown', { keyCode: 27 });
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('pressing ESC key should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(
      <EditTextarea name='mockName' onSave={handleSave} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.simulate('keydown', { keyCode: 27 });
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('blur event should disable edit mode and trigger onSave', () => {
    const handleSave = jest.fn();
    const component = mount(
      <EditTextarea name='mockName' onSave={handleSave} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.instance().value = 'mockValue';
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).toHaveBeenCalled();
  });
  it('blur event should not trigger onSave if value is not changed', () => {
    const handleSave = jest.fn();
    const component = mount(
      <EditTextarea name='mockName' defaultValue='' onSave={handleSave} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).not.toHaveBeenCalled();
  });
  it('onSave and onChange callbacks should be triggered', () => {
    const handleSave = jest.fn();
    const handleChange = jest.fn();
    const component = mount(
      <EditTextarea
        name='mockName'
        value='mockValue'
        onSave={handleSave}
        onChange={handleChange}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.simulate('change', { target: { value: '' } });
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });
  it('onSave should return correct {name, value} object', () => {
    let resName, resValue;
    const handleSave = ({ name, value }) => {
      resName = name;
      resValue = value;
    };
    const component = mount(
      <EditTextarea name='mockName' onSave={handleSave} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.instance().value = 'mockValue';
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(resName).toEqual('mockName');
    expect(resValue).toEqual('mockValue');
  });
  it('should display placeholder if value is empty string', () => {
    const component = mount(
      <EditTextarea placeholder='mockPlaceholder' value='' />
    );
    expect(component.contains('mockPlaceholder')).toEqual(true);
  });
  it('should display value instead of placeholder if value is not empty', () => {
    const component = mount(
      <EditTextarea placeholder='mockPlaceholder' value='mockValue' />
    );
    expect(component.contains('mockValue')).toEqual(true);
  });
  it('should display placeholder if value is changed to empty string', () => {
    const component = mount(
      <EditTextarea placeholder='mockPlaceholder' defaultValue='mockValue' />
    );
    expect(component.contains('mockValue')).toEqual(true);
    component.simulate('click');
    const textarea = component.find('textarea');
    textarea.instance().value = '';
    textarea.simulate('blur');
    expect(component.contains('mockPlaceholder')).toEqual(true);
  });
  it('should display value instead of placeholder if value is changed to non-empty string', () => {
    const component = mount(
      <EditTextarea placeholder='mockPlaceholder' defaultValue='' />
    );
    expect(component.contains('mockPlaceholder')).toEqual(true);
    component.simulate('click');
    const textarea = component.find('textarea');
    textarea.instance().value = 'mockValue';
    textarea.simulate('blur');
    expect(component.contains('mockValue')).toEqual(true);
  });
  it('should not display textarea when readonly', () => {
    const component = mount(<EditTextarea readonly />);
    component.simulate('click');
    expect(component.exists('textarea')).toEqual(false);
  });
  it('should not display textarea when not readonly', () => {
    const component = mount(<EditTextarea readonly={false} />);
    component.simulate('click');
    expect(component.exists('textarea')).toEqual(true);
  });
});
