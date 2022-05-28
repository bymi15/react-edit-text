import classnames from 'classnames';
import React from 'react';
import styles from '../styles.module.css';

const Textarea = ({
  props: { id, rows, style, name },
  inputRef,
  handleBlur,
  handleKeydown,
  inputClassName,
  ...rest
}) => {
  return (
    <textarea
      id={id}
      className={classnames(styles.shared, inputClassName)}
      style={style}
      ref={inputRef}
      rows={rows}
      name={name}
      onBlur={handleBlur}
      onKeyDown={handleKeydown}
      autoFocus
      onFocus={(e) =>
        e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        )
      }
      {...rest}
    />
  );
};

export default Textarea;
