import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import MainRouter from './Router.jsx';

ReactDOM.render(
  <React.StrictMode>
    <MainRouter />  
  </React.StrictMode>,
  document.getElementById('root')
);
