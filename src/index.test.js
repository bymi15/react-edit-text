import { render } from '@testing-library/react';
import React from 'react';
import { EditText, EditTextarea } from '.';

describe('index', () => {
  it('should correctly render EditText component', () => {
    render(<EditText />);
  });
  it('should correctly render EditTextarea component', () => {
    render(<EditTextarea />);
  });
});
