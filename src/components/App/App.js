import React, { Component } from 'react';
import WebGLCanvas from '../WebGLCanvas/WebGLCanvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
				<WebGLCanvas/>
      </div>
    );
  }
}

export default App;
