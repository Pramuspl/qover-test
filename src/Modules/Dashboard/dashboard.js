import React, {Component, useState, useEffect} from 'react';

import './dashboard.module.css';
import Header from '../Header/header';
import {Route, Switch} from 'react-router-dom';

import styles from './dashboard.module.css';

import {OutlinedInput, Select, MenuItem, Button} from '@material-ui/core';
import LabeledInput from '../Common/LabeledInput/LabeledInput'

import {firebaseFunctions} from '../../Helpers/FirebaseInterface'


import {connect} from 'react-redux';
// import { BASE_URL } from './../../Helpers/utils';

const Dashboard = (props) => {

    const carValues = [
        {name: "Audi", value: 'audi'},
        {name: "BMW", value: 'bmw'},
        {name: "Porsche", value: 'porsche'},
    ];

    const [age, setAge] = useState(0);
    const [car, setCar] = useState(carValues[0].value);
    const [price, setPrice] = useState(0);

    const [ageError, setAgeError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(null);

    const formRef = React.createRef();


    useEffect(() => {
        // callback to parent that set props
        formRef.current.addEventListener('submit', function (e) {
            e.preventDefault();
        });
    });

    const validateAge = (val) => {
        if (val<18){
            setAgeError("Sorry! The driver is too young!");
        } else {
            setAgeError(null);
            setAge(Number(val));
        }
    };

    const validatePrice = (val) => {
        if (val<5000){
            setPriceError("Sorry! The price of the car is too low!");
        } else {
            setPriceError(null);
            setPrice(Number(val));
        }
    };

    const getPrice = () => {
        if (!ageError & !priceError){
            firebaseFunctions.httpsCallable('getPrice')({
                age: age,
                car: car,
                price: price
            }).then((result)=> {
                if (result.data.type==="ERROR"){
                    setServerErrorMessage(result.data.value)
                } else if (result.data.type==="SUCCESS"){
                    console.log(result);
                    setServerErrorMessage(null)
                }
            });
        }
    };
        return (
            <div className={styles.wrapper}>
                <Header history={props.history}/>
                <div className="centerContent">
                    <form ref={formRef} className={styles.dashboardContainer}>
                        <div className={styles.formFieldsContainer}>
                            <LabeledInput label="Age">
                                <OutlinedInput error={ageError} type='number' id='age' variant="outlined" onChange={(e)=>validateAge(e.target.value)}
                                               required={true}
                                               className={styles.ageInput}/>
                                <span className={styles.errorMessage}>{ageError}</span>
                            </LabeledInput>
                            <LabeledInput label="Car">
                                <Select value={car} id='car' variant="outlined" onChange={(e)=>setCar(e.target.value)} required={true}
                                        className={styles.carInput} input={<OutlinedInput />}>
                                    {carValues.map(item => (<MenuItem value={item.value}>{item.name}</MenuItem>))}
                                    {/*<MenuItem value={"Audi"}>Ten</MenuItem>*/}
                                    {/*<MenuItem value={"BMW"}>Twenty</MenuItem>*/}
                                    {/*<MenuItem value={"Porsche"}>Thirty</MenuItem>*/}
                                </Select>
                            </LabeledInput>
                            <LabeledInput label="Value">
                                <OutlinedInput error={priceError} type='number' id='price' variant="outlined" onChange={(e)=>validatePrice(e.target.value)}
                                               required={true}
                                               className={styles.valueInput}/><span className={priceError ? styles.errorMessage : null}>€ </span>

                                <span className={styles.errorMessage}>{priceError}</span>
                            </LabeledInput>
                        </div>
                        <p className={!serverErrorMessage ? 'invisible' : styles.errorMessage}>{serverErrorMessage || '&nbsp'}</p>
                        <Button size="large" type="submit" className={styles.getPrice} onClick={getPrice}>Get a
                            price</Button>
                    </form>
                </div>
            </div>
        );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(Dashboard);
