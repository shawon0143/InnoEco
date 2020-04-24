import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';
import Footer from "./components/Footer/Footer";
import * as serviceWorker from './serviceWorker';
const { store, persistor } = configureStore();
const app = (

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
            <Footer />
        </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
