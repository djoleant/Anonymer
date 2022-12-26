import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {createStore, combineReducers} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import authReducer from './reducers/Auth';
import thunkMiddleware from "redux-thunk"
import {applyMiddleware} from "redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

// const store = createStore(
//   combineReducers({
//       auth: authReducer,
//   }),
//   applyMiddleware(thunkMiddleware)
// );

root.render(
  
    // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    // </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
