import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './Modules/Login/login';
import Dashboard from './Modules/Dashboard/dashboard';

const BASE_URL = process.env.PUBLIC_URL;

const App = () => (
    <div className='wrapper'>
        <Switch>
            {/*/!*<Route path={BASE_URL + '/dashboard/vr-experiences'} component={Dashboard} />*!/*/}
            <Route exact path={BASE_URL + '/'} component={Login} />
            <Route exact path={BASE_URL + '/dashboard'} component={Dashboard} />
        </Switch>
    </div>
);

export default App;
