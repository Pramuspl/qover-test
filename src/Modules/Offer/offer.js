import React, {useState} from 'react';
import {connect} from 'react-redux';

import Header from '../Header/header';
import Card from '../Common/Card/Card'

import styles from './offer.module.css';

import {Switch, Button} from '@material-ui/core';

const Offer = (props) => {

    const [yearlyPayment, setYearlyPayment] = useState(true);

        return (
            <div className={styles.wrapper}>
                <Header history={props.history}/>
                <div className="centerContent">
                    <p>Select plan</p>
                        <span className={styles.planSelectorContainer}>
                            <span>PAY MONTHLY</span>
                            <Switch checked={yearlyPayment} onChange={(e,checked)=>{checked ? setYearlyPayment(true) : setYearlyPayment(false);}}/>
                            <span>PAY YEARLY</span>
                        </span>
                    <span className={styles.cardsContainer}>
                        <Card id="global" title="Global" details={{maxDur: 90, medExp: 1000000, persAss: 5000, travAss: 1000, dur: 1}} cost={props.global/(yearlyPayment ? 1 : 12)}></Card>
                        <Card id="universe" title="Universe" details={{maxDur: 180, medExp: 3000000, persAss: 10000, travAss: 2500, dur: 1}} cost={props.universal/(yearlyPayment ? 1 : 12)}></Card>
                    </span>
                </div>
            </div>
        );
};

const mapStateToProps = (state) => {
    return {
        global: state.insurance.global,
        universal: state.insurance.universal
    };
};

export default connect(mapStateToProps)(Offer);
