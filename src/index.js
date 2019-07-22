import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'; //Add CSS for whole application just here
import Game from './Game';
import * as serviceWorker from './serviceWorker';

//Render Game, Board and Sqaure all in same page

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
