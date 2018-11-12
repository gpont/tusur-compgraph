import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// @ts-ignore
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
