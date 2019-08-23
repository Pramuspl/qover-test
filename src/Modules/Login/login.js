import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

import {loginAction} from '../../Helpers/Auth/auth.actions.js';

import Header from '../Header/header';

import {Input, InputLabel, Button} from '@material-ui/core';

import styles from './login.module.css';
import {compose} from 'redux';
import {connect} from 'react-redux';

import logo from '../../assets/img/qover_logo.svg';
import toggleOn from '../../assets/img/toggle-on.svg';

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
        const {loggedIn, errorMessage} = this.props;
        if (loggedIn) {
            this.props.history.push(BASE_URL + '/dashboard/');
        }
        return (

            <div className={styles.login}>
                <Header history={this.props.history}/>
                <div className="centerContent">
                    <img className={styles.logo} src={logo} alt='qover.me'/>
                    <form ref={this.formRef} className={styles.loginContainer}>
                        <h2 className={styles.infoText}>Welcome at Qover</h2>
                        <InputLabel htmlFor="email" className={'inputLabel'}>Email</InputLabel>
                        <Input type='email' id='email' onChange={this.handleChange} required={true}
                               className={'input'}/>
                        <InputLabel htmlFor="password" className={'inputLabel'}>Password</InputLabel>
                        <Input type='password' id='password' onChange={this.handleChange} required={true}
                               className={'input'}/>
                        <div className={styles.loginOptions}>
                            <span className={styles.rememberme}><img src={toggleOn}/> Remember me?</span>
                            <span className={styles.forgotpassword}> Forgot your password?</span>
                        </div>
                        <p className={!errorMessage ? 'invisible' : null}>{errorMessage || '&nbsp'}</p>
                        <Button size="large" type="submit" onClick={this.login}
                                className={styles.signin}>Sign in to your account</Button>
                    </form>
                    <p className={styles.requestAccount}>Don&apos;t have an account? <span>Ask access</span></p>
                </div>
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