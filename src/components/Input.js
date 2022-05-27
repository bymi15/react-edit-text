import classnames from 'classnames';
import React from 'react';
import styles from '../styles.module.css';

const Input = ({
  props: { id, inline, className, style, type, name },
  inputRef,
  handleBlur,
  handleKeydown,
  handleFocus,
  inputClassName,
  ...rest
}) => {
  return (
    <input
      id={id}
      className={classnames(styles.shared, className, inputClassName)}
      style={style}
      ref={inputRef}
      type={type}
      name={name}
      onBlur={handleBlur}
      onKeyDown={handleKeydown}
      autoFocus
      onFocus={handleFocus}
      {...rest}
    />
  );
};

export default Input;
