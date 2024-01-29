import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PaymentForm } from './components/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PaymentForm />
      </header>
    </div>
  );
}

export default App;
