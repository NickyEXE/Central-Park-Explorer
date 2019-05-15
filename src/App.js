import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Location from './containers/Location.js'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
    <Switch>
      <Route path='/locations/:id' render={(routeProps) => <Location {...routeProps} />} />
    </Switch>
    </div>
  );
}

export default App;
