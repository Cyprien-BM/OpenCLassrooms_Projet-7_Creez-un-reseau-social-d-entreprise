import { createStore, applyMiddleware, combineReducers } from 'redux';
// import postReducer from './posts/postReducer';
import loginReducer from './login/loginReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  // postReducer,
  loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
