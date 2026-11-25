import React from 'react';

const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary fixed-top'>
    <a className='navbar-brand' href='https://bymi15.github.io/react-edit-text'>
      React Edit Text
    </a>
    <button
      className='navbar-toggler'
      type='button'
      data-toggle='collapse'
      data-target='#navbarColor01'
      aria-controls='navbarColor01'
      aria-expanded='false'
      aria-label='Toggle navigation'
    >
      <span className='navbar-toggler-icon'></span>
    </button>

    <div className='collapse navbar-collapse' id='navbarColor01'>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item active'>
          <a className='nav-link' href='https://brianmin.tech/react-edit-text/'>
            Home <span className='sr-only'>(current)</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#props'>
            Props
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#callbacks'>
            Callbacks
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
