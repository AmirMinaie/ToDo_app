import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App/index';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reducers from './Redux/reduser'
import { composeWithDevTools } from 'redux-devtools-extension';
import {BrowserRouter} from 'react-router-dom'



const store = createStore(reducers, composeWithDevTools(applyMiddleware()));


ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode className='defalteFont'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

