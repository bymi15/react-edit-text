import React from 'react';
import EditText from '.';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EditText', () => {
  it('clicking on the component activates edit mode', () => {
    const component = mount(<EditText />);
    expect(component.state().editMode).toEqual(false);
    component.simulate('click');
    expect(component.state().editMode).toEqual(true);
  });
});
