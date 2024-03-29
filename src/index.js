import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/reduxStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { setupInterceptor } from './API/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
// setupInterceptor(store);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
