import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducersHomeBags } from './reducers/reducersHomeBags';
import { reducersHomeHome } from './reducers/reducersHomeHome';
import { reducersHomeStorage } from './reducers/reducersHomeStorage';
import { reducersProductList } from './reducers/reducersProductList';

const reducer = combineReducers({
    homeScreenBags: reducersHomeBags,
    homeScreenHome: reducersHomeHome,
    homeScreenStorage: reducersHomeStorage,
    productList: reducersProductList
})

const initialState = {};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store