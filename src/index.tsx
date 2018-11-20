import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
// @ts-ignore
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
