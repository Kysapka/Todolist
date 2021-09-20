import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {rootState} from "./state/Store";
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={rootState}>
        <App/>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
