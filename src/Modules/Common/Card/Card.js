import React from 'react';

import {Button} from '@material-ui/core';

import style from './Card.module.css';

import CheckCircle from '@material-ui/icons/CheckCircle';

const Card = ({id, title, cost, details = [], selectedPlan, setSelectedPlan, paymentSchedule}) => {

    const cardStyles = [style.card];
    const buttonStyles = [style.button];
    let button;

    if (selectedPlan === id) {
        cardStyles.push(style.activeCard);
        buttonStyles.push(style.activeButton);
        button = <Button className={style.button}>
                    <CheckCircle className={style.btnIcon} />
                     Plan selected
                </Button>;
    } else {
        button = <Button onClick={()=>setSelectedPlan(id)} className={style.button}>
                    Choose this plan
                </Button>;
    }

    function roundIfNecessary(amount) {
        return (amount % 1 !== 0) ? amount.toFixed(2) : amount;
    }

    return (
        <div id={id} className={cardStyles.join(' ')}>
            <h2>{title}</h2>
            <p id="cost" className={style.cost}>
                {roundIfNecessary(cost).toLocaleString('nl-BE')} <sup className={style.euroSign}>€</sup>
                <p className={style.costNote}>{(`${paymentSchedule} incl. taxes`).toUpperCase()}</p>
            </p>
            <span className={style.detailsContainer}>
                <p className={style.detail}>Maximum duration travel <span
                    className={style.normalFont}>of</span> {details.maxDur} days</p>
                <p className={style.detail}>Medical expenses reimbursement <span
                    className={style.normalFont}>up to</span> {details.medExp.toLocaleString('nl-BE')}€</p>
                <p className={style.detail}>Personal assistance abroad <span
                    className={style.normalFont}>up to</span> {details.persAss.toLocaleString('nl-BE')}€</p>
                <p className={style.detail}>Travel assistance abroad <span
                    className={style.normalFont}>up to</span> {details.travAss.toLocaleString('nl-BE')}€
                    <span className={style.normalFont}> per insured per travel</span></p>
                <p className={style.detail}>Coverage duration: {details.dur} year</p>
            </span>
            {button}
        </div>
    );
};
export default Card;