import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';
import React from 'react';
import { EditText, EditTextarea } from '.';
configure({ adapter: new Adapter() });

describe('index', () => {
  it('should correctly render EditText component', () => {
    const component = shallow(<EditText />);
    expect(component).toBeTruthy();
  });
  it('should correctly render EditTextarea component', () => {
    const component = shallow(<EditTextarea />);
    expect(component).toBeTruthy();
  });
});
