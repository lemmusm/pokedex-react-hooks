import React from 'react';
import './App.scss';
import UseStateComponent from './components/UseStateComponent';
import UseReducerComponent from './components/UseReducerComponent';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>POKEDEX</h1>
        <div className="row">
          <div className="column">
            <UseStateComponent />
          </div>
          <div className="column">
            <UseReducerComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
