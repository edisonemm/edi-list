import React from 'react'
import App from './components/App'
import { createRoot } from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import reducer from './store/reducers/auth'

// const store = createStore(reducer, applyMiddleware(thunk))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)) )

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

const container = document.getElementById('app');
const root = createRoot(container);
root.render(app);