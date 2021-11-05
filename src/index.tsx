import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './app/App';
import * as serviceWorker from './serviceWorker';
import {rootState} from "./app/store";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={rootState}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
