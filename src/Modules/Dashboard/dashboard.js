import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import { BASE_URL } from '../../Helpers/utils';
import { setInsuranceValues } from '../../Helpers/Insurance/insurance.actions.js';

import {firebaseFunctions} from '../../Helpers/FirebaseInterface'
import Header from '../Header/header';
import styles from './dashboard.module.css';

import {OutlinedInput, Select, MenuItem, Button} from '@material-ui/core';
import LabeledInput from '../Common/LabeledInput/LabeledInput'
import ExpandMore from '@material-ui/icons/ExpandMore';

const Dashboard = (props) => {

    const {
        wrapper,
        dashboardContainer,
        formFieldsContainer,
        ageInput,
        errorMessage,
        carInput,
        valueInput,
        getPriceBtn,
        selectIcon
    } = styles;

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
        if (!ageError && !priceError){
            firebaseFunctions.httpsCallable('getPrice')({
                age: age,
                car: car,
                price: price
            }).then((result)=> {
                if (result.data.type==="ERROR"){
                    setServerErrorMessage(result.data.value)
                } else if (result.data.type==="SUCCESS"){
                    props.setInsuranceValues(result.data.value);
                    setServerErrorMessage(null);
                    props.history.push(BASE_URL + '/offer/');
                }
            });
        }
    };
        return (
            <div className={wrapper}>
                <Header history={props.history}/>
                <div className="centerContent">
                    <form ref={formRef} className={dashboardContainer}>
                        <div className={formFieldsContainer}>
                            <LabeledInput label="Age of the driver">
                                <OutlinedInput error={ageError} type='number' id='age' variant="outlined" onChange={(e)=>validateAge(e.target.value)}
                                               required={true}
                                               className={ageInput}/>
                                <span className={errorMessage}>{ageError}</span>
                            </LabeledInput>
                            <LabeledInput label="Car">
                                <Select value={car} id='car' variant="outlined" onChange={(e)=>setCar(e.target.value)} required={true}
                                        className={carInput} classes={{icon: selectIcon}} IconComponent={ExpandMore} input={<OutlinedInput />}>
                                    {carValues.map(item => (<MenuItem value={item.value}>{item.name}</MenuItem>))}
                                </Select>
                            </LabeledInput>
                            <LabeledInput label="Purchase price">
                                <OutlinedInput error={priceError} type='number' id='price' variant="outlined" onChange={(e)=>validatePrice(e.target.value)}
                                               required={true}
                                               className={valueInput}/><span className={priceError ? errorMessage : null}>€ </span>

                                <span className={errorMessage}>{priceError}</span>
                            </LabeledInput>
                        </div>
                        <p className={!serverErrorMessage ? 'invisible' : errorMessage}>{serverErrorMessage || '&nbsp'}</p>
                        <Button size="large" type="submit" className={getPriceBtn} onClick={getPrice}>Get a
                            price</Button>
                    </form>
                </div>
            </div>
        );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setInsuranceValues: (insuranceValues) => dispatch(setInsuranceValues(insuranceValues))
    };
};

export default connect(null,mapDispatchToProps)(Dashboard);
