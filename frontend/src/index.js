import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './screens/homepage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './screens/signup';
import Login from './screens/login';
import PageNotFound from './screens/pageNotFound';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
