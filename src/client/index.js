import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import '../../public/styles.scss';
import 'tw-elements';

const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);