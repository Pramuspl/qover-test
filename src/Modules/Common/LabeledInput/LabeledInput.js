import React from 'react';

import style from './LabeledInput.module.css';

const LabeledInput = ({ children, label, id, className }) => {

  return (
    <span id={id} className={style.labeledInput + ' ' + className}>
      <label className={style.label} htmlFor={id}>{label}</label>
      <span className="inputContainer">{children}</span>
    </span>
  );
};
export default LabeledInput;