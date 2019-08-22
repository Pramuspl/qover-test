/* eslint-disable react/prop-types */
import React from 'react';

import styles from './header.module.css';
import { NavLink } from 'react-router-dom';

import { logoutAction } from '../../Helpers/Auth/auth.actions.js';

import { connect } from 'react-redux';

const BASE_URL = process.env.PUBLIC_URL;

const Header = (props) => {
  const { loggedIn, history } = props;
  const location = history.location.pathname;
  console.log(styles.header);
  const headerStyles = [
    styles.header,
    location && location === '/' ? styles.landing : ''
  ];
  if (!loggedIn) {
    props.history.push(BASE_URL);
  }
  const renderLandingPageLinks = () => {
    return (
      <>
        <NavLink className={styles.link} to='#'>
          <h2>QOVER.ME</h2>
        </NavLink>
      </>
    );
  };
  const renderLoggedInPageLinks = () => {
    return (
      <>
        <NavLink to='#' onClick={props.logOut} className={styles.link}>
          <h2>LOG OUT</h2>
        </NavLink>
      </>
    );
  };
  return (
      <div className={headerStyles.join(' ')}>
        <NavLink className={styles.logo} to='/dashboard/vr-experiences'>
          {/*<img src={logo} alt='lucidweb.pro' />*/}
        </NavLink>
        <div className={styles.links}>
          {location && location === '/' ? renderLandingPageLinks() : renderLoggedInPageLinks()}
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: !state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logoutAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
