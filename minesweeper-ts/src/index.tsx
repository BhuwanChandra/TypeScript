import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Navbar from './components/Navbar';
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


