/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types'

import style from './TextInput.module.css';

const TextInput = React.forwardRef(({ onChange, placeholder, id, label, defaultValue, readonly, className = '', type = 'text', isRequired }, ref) => {

  const labelEl = label ? <label className={style.label} htmlFor={id}>{label}</label> : null;
  const input =
    <input
      className={style.textInput}
      id={id}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      readOnly={readonly}
      ref={ref}
      required={isRequired}
    />;

  return (
    <span className={style.textInputContainer + ' ' + className}>
      {labelEl}
      {input}
    </span>
  );
});
TextInput.displayName = 'TextInput';
export default TextInput;