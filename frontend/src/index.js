import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from './store';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from 'react-toastify';
import './App.css';
window.process={};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store= {store}>
    <ToastContainer className="Toast" position='bottom-center' autoClose={5000}/>
    <App />
    
  </Provider>
);

