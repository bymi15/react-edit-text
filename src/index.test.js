import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { EditText, EditTextarea } from '.';
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
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = '';
    input.simulate('blur');
    expect(component.state().editMode).toEqual(false);
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
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('change', { target: { value: '' } });
    input.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleChange).toHaveBeenCalled();
  });
  it('onEditMode callback should be triggered', () => {
    const handleEditMode = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onEditMode={handleEditMode} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });
  it('onEditMode callback should not be triggered if already in edit mode', () => {
    const handleEditMode = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onEditMode={handleEditMode} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    component.simulate('click');
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });
  it('onBlur callback should be triggered on enter key press (in edit mode)', () => {
    const handleBlur = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onBlur={handleBlur} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('keydown', { keyCode: 13 }); // Enter key
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  it('onBlur callback should be triggered on escape key press (in edit mode)', () => {
    const handleBlur = jest.fn();
    const component = mount(
      <EditText name='mockName' value='mockValue' onBlur={handleBlur} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.simulate('keydown', { keyCode: 27 }); // Escape key
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
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.state().editMode).toEqual(false);
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
      <EditText
        name='mockName'
        onChange={() => {}}
        value='mockValueBefore'
        onSave={handleSave}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const input = component.find('input');
    input.instance().value = 'mockValue';
    input.simulate('keydown', { keyCode: 13 });
    expect(component.state().editMode).toEqual(false);
    expect(resName).toEqual('mockName');
    expect(resValue).toEqual('mockValue');
    expect(resPreviousValue).toEqual('mockValueBefore');
  });
  it('previousValue should not change if value is changed while in edit mode', () => {
    const component = mount(
      <EditText
        name='mockName'
        onChange={() => {}}
        value='mockValue'
        onSave={() => {}}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    component.state().value = 'newMockValue';
    expect(component.state().previousValue).toEqual('mockValue');
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
  it('should display input when not readonly', () => {
    const component = mount(<EditText readonly={false} />);
    component.simulate('click');
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
  it('onSave callback should be triggered', () => {
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
    textarea.instance().value = '';
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(handleSave).toHaveBeenCalled();
  });
  it('onChange callback should be triggered', () => {
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
    expect(handleChange).toHaveBeenCalled();
  });
  it('onEditMode callback should be triggered', () => {
    const handleEditMode = jest.fn();
    const component = mount(
      <EditTextarea
        name='mockName'
        value='mockValue'
        onEditMode={handleEditMode}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });
  it('onEditMode callback should not be triggered if already in edit mode', () => {
    const handleEditMode = jest.fn();
    const component = mount(
      <EditTextarea
        name='mockName'
        value='mockValue'
        onEditMode={handleEditMode}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    component.simulate('click');
    expect(handleEditMode).toHaveBeenCalledTimes(1);
  });
  it('onBlur callback should be triggered on escape key press (in edit mode)', () => {
    const handleBlur = jest.fn();
    const component = mount(
      <EditTextarea name='mockName' value='mockValue' onBlur={handleBlur} />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.simulate('keydown', { keyCode: 27 }); // Escape key
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
      <EditTextarea
        name='mockName'
        defaultValue='mockValueBefore'
        onSave={handleSave}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.instance().value = 'mockValue';
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
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
      <EditTextarea
        name='mockName'
        onChange={() => {}}
        value='mockValueBefore'
        onSave={handleSave}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    const textarea = component.find('textarea');
    textarea.instance().value = 'mockValue';
    textarea.simulate('blur');
    expect(component.state().editMode).toEqual(false);
    expect(resName).toEqual('mockName');
    expect(resValue).toEqual('mockValue');
    expect(resPreviousValue).toEqual('mockValueBefore');
  });
  it('previousValue should not change if value is changed while in edit mode', () => {
    const component = mount(
      <EditTextarea
        name='mockName'
        onChange={() => {}}
        value='mockValue'
        onSave={() => {}}
      />
    );
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
    component.state().value = 'newMockValue';
    expect(component.state().previousValue).toEqual('mockValue');
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
  it('should display textarea when not readonly', () => {
    const component = mount(<EditTextarea readonly={false} />);
    component.simulate('click');
    expect(component.exists('textarea')).toEqual(true);
  });
  it('formatDisplayText should display value correctly based on passed in function', () => {
    const formatDisplayText = jest.fn(() => 'formatTest\nformatTest');
    const component = mount(
      <EditTextarea
        id='test'
        name='mockName'
        value={'test\ntest\ntest'}
        formatDisplayText={formatDisplayText}
      />
    );
    const displayText = component.find('#test');
    expect(formatDisplayText).toHaveBeenCalled();
    expect(displayText.first().text().trim().includes('formatTest')).toEqual(
      true
    );
  });
  it('formatDisplayText should display defaultValue correctly based on passed in function', () => {
    const formatDisplayText = jest.fn(() => 'formatTest\nformatTest');
    const component = mount(
      <EditTextarea
        id='test'
        name='mockName'
        defaultValue={'test\ntest\ntest'}
        formatDisplayText={formatDisplayText}
      />
    );
    const displayText = component.find('#test');
    expect(formatDisplayText).toHaveBeenCalled();
    expect(displayText.first().text().trim().includes('formatTest')).toEqual(
      true
    );
  });
});
