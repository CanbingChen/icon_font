import React, {Component,PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import 'react-flexible';

import './less/main.less';

import route from './Config/Route.jsx';
import store from './Config/Store.jsx';

store.subscribe(function(){

});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
