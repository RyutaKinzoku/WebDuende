import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from './Routes'
import BarraNavegacion from './Vista/BarraNavegacion';

ReactDOM.render(
  <React.StrictMode>
      <BarraNavegacion />
      <Router />
  </React.StrictMode>,
  document.getElementById('root')
);