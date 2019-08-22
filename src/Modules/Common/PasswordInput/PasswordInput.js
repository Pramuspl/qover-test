/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types'
import style from '../TextInput/TextInput.module.css';

const TextInput = ({ onChange, defaultValue, id, cols = 20 }) => (
  <span className={style.textInputContainer}>
    {/*<label className={style.label} htmlFor={id}>Password</label>*/}
    <input
      id={id}
      className={style.textInput}
      type="password"
      onChange={onChange}
      size={cols + 1}
      defaultValue={defaultValue}
      placeholder={'Password'}
    >
    </input>
  </span>
);

export default TextInput;