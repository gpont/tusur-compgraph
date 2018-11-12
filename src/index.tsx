import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import './index.css';
// @ts-ignore
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
