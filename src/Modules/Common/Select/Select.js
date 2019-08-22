// external imports

import React from 'react';
import styles from './Select.module.css';
// import ExpandMore from '@material-ui/icons/ExpandMore';
const Select = (props) => {

  const { options, label, labelText } = props;

  let optionList = options.map((item, index) => {
    return (
      <option value={item.value} key={`option_${index}`}>{item.value}</option>
    );
  });

  return (
    <div className={styles.selectBox}>
      {/*<ExpandMore className={styles.fancyArrow} />*/}
      <label htmlFor={label}>{labelText}</label>
      <select id={label} className={styles.select}>
        {optionList}
      </select>
    </div>
  );
};


export default Select;