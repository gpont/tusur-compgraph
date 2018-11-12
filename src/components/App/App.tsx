import * as React from 'react';

import './App.css';
// @ts-ignore
import Canvas from './Canvas.js';

function App() {
  return (
    <div className="App">
      <Canvas
        size={750}
        scale={15}
        gridSize={25}
        font={'9px Arial'}
      />
    </div>
  );
}

export default App;
