import React from 'react';

import styles from './header.module.css';
import { NavLink } from 'react-router-dom';

import { logoutAction } from '../../Helpers/Auth/auth.actions.js';

import { connect } from 'react-redux';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const BASE_URL = process.env.PUBLIC_URL;

const Header = (props) => {
  const { loggedIn, history } = props;
  const location = history.location.pathname;
  if (!loggedIn) {
    props.history.push(BASE_URL);
  }
  const renderLandingPageLinks = () => {
    return (
          <a href="https://qover.me" className={styles.link}>
              <span><KeyboardArrowLeftIcon />QOVER.ME</span>
          </a>
    );
  };
  const renderLoggedInPageLinks = () => {
    return (
      <>
        <NavLink to='#' onClick={props.logOut} className={styles.link}>
          <span><KeyboardArrowLeftIcon />LOGOUT</span>
        </NavLink>
      </>
    );
  };
  return (
      <div className={styles.header}>
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
