# [5.0.0](https://github.com/bymi15/react-edit-text/compare/v4.4.1...v5.0.0) (2022-06-01)


* fix!: onChange prop to return DOM event rather than just the new value (#32) ([e9e59b3](https://github.com/bymi15/react-edit-text/commit/e9e59b336cdce96fbe32d741ab1f8e5ab90843e5)), closes [#32](https://github.com/bymi15/react-edit-text/issues/32)


### BREAKING CHANGES

* onChange will now return the DOM event rather than just the new value

## [4.4.1](https://github.com/bymi15/react-edit-text/compare/v4.4.0...v4.4.1) (2022-05-30)


### Bug Fixes

* pass inline prop to Input component ([#31](https://github.com/bymi15/react-edit-text/issues/31)) ([f18a50b](https://github.com/bymi15/react-edit-text/commit/f18a50b29af2854aaec65b02c92b72bdcdcc95af))

# [4.4.0](https://github.com/bymi15/react-edit-text/compare/v4.3.0...v4.4.0) (2022-03-21)


### Features

* **11:** add props for displaying edit button and refactor project with react hooks ([#23](https://github.com/bymi15/react-edit-text/issues/23)) ([78de49d](https://github.com/bymi15/react-edit-text/commit/78de49d1d343c979ed912d9538badc791caf971e))

# [4.3.0](https://github.com/bymi15/react-edit-text/compare/v4.2.0...v4.3.0) (2022-03-01)


### Bug Fixes

* update dependencies ([7fa781a](https://github.com/bymi15/react-edit-text/commit/7fa781a31653a3058dbcb301b407f02e88f36739))


### Features

* add formatDisplayText prop for providing callback function to format display text ([cac7fda](https://github.com/bymi15/react-edit-text/commit/cac7fda1c8cdfb22f993452862d7c5bc26fb7553))

# [4.2.0](https://github.com/bymi15/react-edit-text/compare/v4.1.0...v4.2.0) (2021-08-22)

### Features

- add onBlur callback ([850adce](https://github.com/bymi15/react-edit-text/commit/850adce60b529c0ccab9c4ecebe20d3ef1d7f189))

# [4.1.0](https://github.com/bymi15/react-edit-text/compare/v4.0.3...v4.1.0) (2021-07-26)

### Features

- add onEditMode callback prop ([836e58d](https://github.com/bymi15/react-edit-text/commit/836e58d23da12923ae8849952e23a3f78281d58b))

## [4.0.3](https://github.com/bymi15/react-edit-text/compare/v4.0.2...v4.0.3) (2021-04-03)

### Bug Fixes

- force minor version update to update readme in npmjs ([d079ab9](https://github.com/bymi15/react-edit-text/commit/d079ab94acaf2cfdbe96a178f786e01edb6a092a))

## [4.0.2](https://github.com/bymi15/react-edit-text/compare/v4.0.1...v4.0.2) (2021-04-03)

### Bug Fixes

- setSelectionRange causing bugs for input types that are not text ([777fba9](https://github.com/bymi15/react-edit-text/commit/777fba9f5d401d4374b653e6ae4f7f39b2c2adca))

## [4.0.1](https://github.com/bymi15/react-edit-text/compare/v4.0.0...v4.0.1) (2021-03-09)

### Bug Fixes

- upgrade package to fix security issue ([96b5914](https://github.com/bymi15/react-edit-text/commit/96b59148c78203db085983fe04db65491d3f780b))

# [4.0.0](https://github.com/bymi15/react-edit-text/compare/v3.0.1...v4.0.0) (2021-02-19)

### Features

- add previousValue field to onSave callback response ([3057b92](https://github.com/bymi15/react-edit-text/commit/3057b92078bc95e4cb3a6ddb654c0611df2e3f67))
- move cursor to end of text on focus ([3fde4bd](https://github.com/bymi15/react-edit-text/commit/3fde4bde2ab8dc1f6065bc7900d5bddfbf090a24))

### BREAKING CHANGES

- fix handleBlur to correctly revert changes when escape key is pressed

## [3.0.1](https://github.com/bymi15/react-edit-text/compare/v3.0.0...v3.0.1) (2021-01-13)

### Bug Fixes

- allow onSave callback to be triggered when used with onChange ([6508ea4](https://github.com/bymi15/react-edit-text/commit/6508ea47411a422ce1ab63d2224534a6b665124a))

# [3.0.0](https://github.com/bymi15/react-edit-text/compare/v2.1.3...v3.0.0) (2021-01-13)

### Features

- add controllable component for both EditText and EditTextarea ([5d34a65](https://github.com/bymi15/react-edit-text/commit/5d34a65d9892451c7846a49e8f96a3629f43b821))
- add controlled values (defaultValue, value, onChange) ([516dd3c](https://github.com/bymi15/react-edit-text/commit/516dd3cb5a3120495db06f732a802d67a2969ca4))

### BREAKING CHANGES

- add defaultValue and onChange props to allow controllable components

## [2.1.3](https://github.com/bymi15/react-edit-text/compare/v2.1.2...v2.1.3) (2020-11-17)

### Bug Fixes

- **EditTextarea:** fix newline not showing in view mode bug ([6a21fa4](https://github.com/bymi15/react-edit-text/commit/6a21fa4dd4b78c5ccb02e87ebc3d049d16170733))

## [2.1.2](https://github.com/bymi15/react-edit-text/compare/v2.1.1...v2.1.2) (2020-11-16)

### Bug Fixes

- fix css bug ([ddab856](https://github.com/bymi15/react-edit-text/commit/ddab8564ab2b3ae3c42c9d7a381126ccca32e4f6))

## [2.1.1](https://github.com/bymi15/react-edit-text/compare/v2.1.0...v2.1.1) (2020-11-16)

### Bug Fixes

- fix browser compatibility issue with thin scrollbar ([822ec70](https://github.com/bymi15/react-edit-text/commit/822ec709872da0ff671549caf8b9d8d3a15f908a))

# [2.1.0](https://github.com/bymi15/react-edit-text/compare/v2.0.0...v2.1.0) (2020-11-16)

### Features

- add scrollbar thin UI for EditTextarea ([82ccfd8](https://github.com/bymi15/react-edit-text/commit/82ccfd8bba5018900a77a7210e985a56e1a47319))

# [2.0.0](https://github.com/bymi15/react-edit-text/compare/v1.1.0...v2.0.0) (2020-11-05)

### Features

- **EditTextarea:** add textarea component ([9b88363](https://github.com/bymi15/react-edit-text/commit/9b88363ae17320511c720a5b8ecfdfc80e1cf394))
- **example:** update documentation page ([16da811](https://github.com/bymi15/react-edit-text/commit/16da811a1ed3f8214d7af4c26e1bac8d6762ab46))
- add EditTextarea component ([bc4eb9a](https://github.com/bymi15/react-edit-text/commit/bc4eb9af793ca6d99d08cd19d15e2ac7ec0ebbe6))

### BREAKING CHANGES

- split up default export into EditText and EditTextarea exports

# [1.1.0](https://github.com/bymi15/react-edit-text/compare/v1.0.1...v1.1.0) (2020-10-28)

### Features

- add readonly prop ([47d5a38](https://github.com/bymi15/react-edit-text/commit/47d5a38e3b3bf5efe40bca35a94b4da738c47018))
- **example:** add example for readonly prop ([34d7646](https://github.com/bymi15/react-edit-text/commit/34d7646bea482793e4ce77793ca7d38a8604487b))

## [1.0.1](https://github.com/bymi15/react-edit-text/compare/v1.0.0...v1.0.1) (2020-10-28)

### Bug Fixes

- **styles:** fix invalid css color for placeholder ([1bf8159](https://github.com/bymi15/react-edit-text/commit/1bf81599181a6bdf4b7bb5275eb7e3284acb5719))

# 1.0.0 (2020-10-14)

### Features

- **EditText:** add EditText component ([a953e78](https://github.com/bymi15/react-edit-text/commit/a953e7894cd1c424f7c6e518e8d3c63b8c228b8f))
- **example:** add demo web page ([854e68c](https://github.com/bymi15/react-edit-text/commit/854e68c4013a9be8ccd2b255c6bd57bdeca22cf2))
