<h1 align="center">React Edit Text</h1>

<p align="center">
    <a href="https://david-dm.org/bymi15/react-edit-text" title="dependencies status">
        <img src="https://david-dm.org/bymi15/react-edit-text/status.svg?style=flat-square"/>
    </a>
    <a href="https://travis-ci.com/github/bymi15/react-edit-text">
        <img src="https://api.travis-ci.com/bymi15/react-edit-text.svg?branch=main" alt="travis" />
    </a>
    <a href="https://www.npmjs.com/package/react-edit-text">
        <img src="https://img.shields.io/npm/v/react-edit-text?color=brightgreen&style=flat-squaret" alt="npm" />
    </a>
</p>

<p align="center">This is an easy-to-use <b>editable text component</b> for <a href="https://reactjs.org/">React</a>. Simply click on the textbox to edit!</p>

<p align="center">Made with <span role="img" aria-label="love">❤️</span> by <a href="https://github.com/bymi15">Brian Min</a></p>

<p align="center">
	<img alt="demo" src="https://raw.githubusercontent.com/bymi15/react-edit-text/main/demo.gif"/>
</p>

## Demo

Feel free to check out the [live demo](https://bymi15.github.io/react-edit-text)

## Install

```bash
npm install react-edit-text --save
```

## Type definitions

```bash
npm install @types/react-edit-text --save-dev
```

## Usage

Make sure to import the <b>CSS stylesheet</b> before using the component.

```jsx
import React, { Component } from 'react';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

class Example extends Component {
  render() {
    return (
      <div>
        <EditText />
        <EditTextarea />
      </div>
    );
  }
}
```

## Props

### Shared props

| Prop         | Type     | Required | Default | Description                                             |
| ------------ | -------- | -------- | ------- | ------------------------------------------------------- |
| id           | string   | No       |         | HTML DOM id attribute                                   |
| name         | string   | No       |         | HTML input name attribute                               |
| className    | string   | No       |         | HTML class attribute                                    |
| value        | string   | No       |         | Value of the component                                  |
| defaultValue | string   | No       |         | Default value of the component                          |
| placeholder  | string   | No       | ''      | Placeholder value                                       |
| onSave       | function | No       |         | Callback function triggered when input is saved         |
| onChange     | function | No       |         | Callback function triggered when input is changed       |
| onEditMode   | function | No       |         | Callback function triggered when component is clicked   |
| onBlur       | function | No       |         | Callback function triggered when input is blurred       |
| style        | object   | No       |         | Sets CSS style of input and view component              |
| readonly     | bool     | No       | false   | Disables the input and only displays the view component |

### EditText props

| Prop   | Type   | Required | Default | Description              |
| ------ | ------ | -------- | ------- | ------------------------ |
| type   | string | No       | 'text'  | HTML DOM input text type |
| inline | bool   | No       | false   | Sets inline display      |

### EditTextarea props

| Prop | Type   | Required | Default | Description            |
| ---- | ------ | -------- | ------- | ---------------------- |
| rows | number | No       | 3       | Number of visible rows |

## Contributing

Contributions are very much appreciated and welcome.
Please refer to the [contributing guidelines](https://github.com/bymi15/react-edit-text/blob/main/CONTRIBUTING.md) for more details.

## License

MIT © [Brian Min](https://github.com/bymi15)
