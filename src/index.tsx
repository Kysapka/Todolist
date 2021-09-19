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


// export const manualRerender = () => {
//
// }
//
// manualRerender()
//
// AppState.subscribe(manualRerender)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
