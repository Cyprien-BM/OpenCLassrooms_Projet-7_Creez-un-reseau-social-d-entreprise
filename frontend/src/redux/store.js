import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './user/userReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
