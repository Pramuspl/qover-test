import React, {Component} from 'react';

import './dashboard.module.css';
import Header from '../Header/header';
import {Route, Switch} from 'react-router-dom';

import styles from './dashboard.module.css';

import {OutlinedInput, Select, MenuItem, Button} from '@material-ui/core';
import LabeledInput from '../Common/LabeledInput/LabeledInput'

import {firebaseFunctions} from '../../Helpers/FirebaseInterface'


import {connect} from 'react-redux';
// import { BASE_URL } from './../../Helpers/utils';

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
        }).then((result)=> {
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
                <Header history={this.props.history}/>
                <div className="centerContent">
                    <form ref={this.formRef} className={styles.dashboardContainer}>
                        <div className={styles.formFieldsContainer}>
                            <LabeledInput label="Age">
                                <OutlinedInput type='number' id='age' variant="outlined" onChange={this.handleChange}
                                               required={true}
                                               className={styles.ageInput}/>
                            </LabeledInput>
                            <LabeledInput label="Car">
                                <Select id='car' variant="outlined" onChange={this.handleChange} required={true}
                                        className={styles.carInput} input={<OutlinedInput />}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </LabeledInput>
                            <LabeledInput label="Value">
                                <OutlinedInput type='number' id='price' variant="outlined" onChange={this.handleChange}
                                               required={true}
                                               className={styles.valueInput}/>€
                            </LabeledInput>
                        </div>
                        <Button size="large" type="submit" className={styles.getPrice} onClick={this.getPrice}>Get a
                            price</Button>
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
