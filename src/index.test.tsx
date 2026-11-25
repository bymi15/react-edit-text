import { expect, test } from 'vitest';
import * as entry from '.';

test('exports exactly the public components', () => {
  expect(Object.keys(entry).sort()).toEqual(['EditText', 'EditTextarea']);
});
