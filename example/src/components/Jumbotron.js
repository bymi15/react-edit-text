import React from 'react';

const Jumbotron = () => (
  <div className='jumbotron mt-5'>
    <div className='container mt-4'>
      <h1 className='display-3'>React Edit Text</h1>
      <p className='right-spacing'>
        <a
          href='https://david-dm.org/bymi15/react-edit-text'
          title='dependencies status'
        >
          <img
            src='https://david-dm.org/bymi15/react-edit-text/status.svg?style=flat-square'
            alt='david dm'
          />
        </a>
        <a href='https://travis-ci.com/github/bymi15/react-edit-text'>
          <img
            src='https://api.travis-ci.com/bymi15/react-edit-text.svg?branch=main'
            alt='travis'
          />
        </a>
        <a href='https://www.npmjs.com/package/react-edit-text'>
          <img
            src='https://img.shields.io/npm/v/react-edit-text?color=brightgreen&style=flat-squaret'
            alt='npm'
          />
        </a>
      </p>
      <hr className='my-4' />
      <p className='lead'>
        This is an editable text component for React. Simply click on the text
        to edit!
      </p>
      <p>
        Made with{' '}
        <span role='img' aria-label='love'>
          ❤️
        </span>{' '}
        by <a href='https://github.com/bymi15'>Brian Min</a>
      </p>
    </div>
  </div>
);

export default Jumbotron;
