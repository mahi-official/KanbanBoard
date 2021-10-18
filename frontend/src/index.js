import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './screens/homepage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './screens/signup';
import Login from './screens/login';
import PageNotFound from './screens/pageNotFound';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}



ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={props => <Home />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login">
          { getToken() ? <Redirect to="/" /> : <Login/> }
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);


reportWebVitals();
