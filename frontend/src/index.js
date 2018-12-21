import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import LoginReducer from './reducers/loginReducer';
import roomReducer from './reducers/RoomReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import homeReducer from './reducers/HomeReducer';
import deviceReducer from './reducers/DeviceReducer';
import functionReducer from './reducers/FunctionReducer';

let rootReducer = combineReducers({
    login: LoginReducer,
    room: roomReducer,
    home: homeReducer,
    device: deviceReducer,
    function: functionReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
