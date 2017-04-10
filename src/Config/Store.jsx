import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducer/Reducer';

/**
 * 创建一个Redux store 来以存放应用中的所有的state, 应用中有且只有一个store
 * @type {[type]}
 */
var store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
);

export default store;
