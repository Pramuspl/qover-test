/* eslint-disable react/prop-types */
import React from 'react';

import styles from './Button.module.css';

const Button = ({
  onClick,
  id,
  value,
  isSubmit,
  className,
  variant,
  disabled,
  iconClass,
  linkTo,
  linkStyle
}) => {
  const type = isSubmit ? 'submit' : 'button';
  const buttonStyle =
    variant === 'secondary' ? styles.secondary : styles.primary;


  const renderButton = () => {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        className={
          styles.btn +
          ' ' +
          buttonStyle +
          (iconClass ? ' ' + styles.withIcon : '')
        }
        disabled={disabled}
      >
        {iconClass ? <i className={styles.icon + ' ' + iconClass} /> : null}
        <span style={{ display: 'inline-block' }}>{value}</span>
      </button>
    );
  };
  const renderNavLink = () => {
    const classNames = [
      styles.btnLink,
      styles.btn,
      buttonStyle,
      linkStyle,
      iconClass = iconClass ? styles.withIcon : ''
    ];
    return (
      <a
        href={linkTo}
        id={id}
        type={type}
        onClick={onClick}
        className={classNames.join(' ')}
        disabled={disabled}
      >
        {iconClass ? <i className={styles.icon + ' ' + iconClass} /> : null
        }
        <span style={{ display: 'inline-block' }}>{value}</span>
      </a >


    );
  };

  return (
    <div className={className}>
      {linkTo ? renderNavLink() : renderButton()}
    </div>
  );
};

export default Button;
