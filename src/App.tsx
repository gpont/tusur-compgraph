import React, { Component } from 'react';
import Canvas from './Canvas';
import './App.css';

class App extends Component {
  render() {
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
}

export default App;
