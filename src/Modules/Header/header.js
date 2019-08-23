import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './header.module.css';
import { logoutAction } from '../../Helpers/Auth/auth.actions.js';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { BASE_URL } from '../../Helpers/utils';

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
        <div>
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
