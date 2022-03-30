import React from 'react';
import logo from './logo.svg';
import './App.css';
import Forecast from './components/Forecast';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <h1>Weather App</h1>
      </header>
      <main className="app__main">
        <Forecast />
      </main>
    </div>
  );
}

export default App;
