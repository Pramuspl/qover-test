import React from 'react';

import style from './Card.module.css';

const Card = ({id, className, title, cost, details=[]}) => {

    return (
            <div id={id} className={style.card + ' ' + className}>
                <h2>{title}</h2>
                <p id="cost">{cost}</p>
                <p>Maximum duration travel of ${details.maxDur} days</p>
                <p>Medical expenses reimbursement up to {details.medExp}€</p>
                <p>Personal assistance abroad up to {details.persAss}€</p>
                <p>Travel assistance abroad up to {details.travAss}€
                    per insured per travel</p>
                <p>Coverage duration: {details.dur} year</p>
            </div>
    );
};
export default Card;