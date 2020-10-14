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

<p align="center">This is an <b>editable text component</b> for <a href="https://reactjs.org/">React</a>. Simply click on the text to edit!</p>
<p align="center">Made with <span role="img" aria-label="love">❤️</span> by <a href="https://github.com/bymi15">Brian Min</a></p>
            
## Demo
Feel free to check out the [live demo](https://bymi15.github.io/react-edit-text)
            
## Install

```bash
npm install react-edit-text --save
```

## Usage

```jsx
import React, { Component } from 'react'

import EditText from 'react-edit-text'
import 'react-edit-text/dist/index.css'

class Example extends Component {
  render() {
    return <EditText name="inputName"></EditText>
  }
}
```

## Props
| Prop        | Type     | Required | Default | Note                                            |
|-------------|----------|----------|---------|-------------------------------------------------|
| id          | string   | No       |         | HTML id attribute                               |
| type        | string   | No       | text    | HTML input type                                 |
| name        | string   | No       | ''      | HTML name attribute                             |
| className   | string   | No       |         | HTML class attribute                            |
| value       | string   | No       | ''      | Value of the input and text content             |
| placeholder | string   | No       | ''      | Placeholder value                               |
| onSave      | function | No       |         | Callback function triggered when input is saved |
| inline      | bool     | No       | false   | Sets inline display                             |
| style       | object   | No       |         | Sets CSS style of input and text component      |

## License

MIT © [bymi15](https://github.com/bymi15)
