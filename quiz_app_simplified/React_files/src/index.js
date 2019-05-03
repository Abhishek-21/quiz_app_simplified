import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './Home.jsx';
import InvalidUser from './InvalidUser.jsx';
import QuizSection from './QuizSection.jsx';

ReactDOM.render(
  <Router>
    <Route exact path= "/" component={App} />
    <Route path="/home" component={Home} />
    <Route path="/InvalidUser" component={InvalidUser} />
    <Route path="/quiz-section" component={QuizSection} />
    {/* <Route path="/*" component={InvalidUser} /> */}
  </Router> , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
