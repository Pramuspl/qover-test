import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { loginAction } from '../../Helpers/Auth/auth.actions.js';

import TextInput from '../Common/TextInput/TextInput';
import PasswordInput from '../Common/PasswordInput/PasswordInput';
import Button from '../Common/Button/Button';
import Header from '../Header/header';

import styles from './login.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';

const BASE_URL = process.env.PUBLIC_URL;

class Login extends Component {



  state = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.formRef.current.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  login = () => {
    if (this.formRef.current.checkValidity()) {
      this.props.logIn(this.state);
    }
  };


  render() {
    const { loggedIn, errorMessage } = this.props;
    if (loggedIn) {
      this.props.history.push(BASE_URL + '/dashboard/');
    }
    return (

          <div>
            <Header history={this.props.history} />
              <span>Have an account? Sign in now</span>
              <form ref={this.formRef}>
                <TextInput type='email' id='email' placeholder={'Email'} onChange={this.handleChange} isRequired={true} />
                <PasswordInput id='password' isRequired={true} onChange={this.handleChange} />
                <div>
                  <p className={!errorMessage ? styles.invisible : null}>{errorMessage || '&nbsp'}</p>
                  <Button isSubmit={true} value='SIGN IN' onClick={this.login} />
                  <input type='submit' onClick={this.forgotPassword} value='Forgot password?' />
                  <p>Don&apos;t have an account yet? <span to='#'>SEND REQUEST</span></p>
                </div>
              </form>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedIn: !state.firebase.auth.isEmpty,
    errorMessage: state.auth.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (credentials) => dispatch(loginAction(credentials)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);