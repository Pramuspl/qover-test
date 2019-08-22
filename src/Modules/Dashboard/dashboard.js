/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import './dashboard.module.css';
// import SideMenu from '../Common/SideMenu/SideMenu';
import Header from '../Header/header';
import { Route, Switch } from 'react-router-dom';

import styles from './dashboard.module.css';

import { firebaseFunctions } from '../../Helpers/FirebaseInterface'


import TextInput from '../Common/TextInput/TextInput';
import Button from '../Common/Button/Button';
import Select from '../Common/Select/Select';

import { connect } from 'react-redux';
// import { BASE_URL } from './../../Helpers/utils';

// import dashboardReducer from './dashboardReducer';


class Dashboard extends Component {

  state = {
    age: 0,
    car: '',
    price: 0
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

  getPrice = () => {
    firebaseFunctions.httpsCallable('getPrice')({
      age: this.state.age,
      car: this.state.car,
      price: this.state.price
    }).then((result)=>{
      console.log(result);
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <Header history={this.props.history} />
        <div className={styles.dashboardWrapper}>
          <form ref={this.formRef}>
            <TextInput type='number' id='age' placeholder={'Age'} onChange={this.handleChange} isRequired={true} />
            <Select id="car" options={[{value: 'porsche'}]} onChange={this.handleChange} />
            <TextInput type='number' id='price' placeholder={'Price'} onChange={this.handleChange} isRequired={true} />€
            <Button isSubmit={true} value='GET A PRICE' onClick={this.getPrice} />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
