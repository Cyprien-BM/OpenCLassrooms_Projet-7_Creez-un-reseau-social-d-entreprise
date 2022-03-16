import { createStore, applyMiddleware, combineReducers } from 'redux';
import loginReducer from './login/loginReducer';
import thunk from 'redux-thunk';
import registerReducer from './register/registerReducer.js';

const rootReducer = combineReducers({
  loginReducer,
  // registerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
