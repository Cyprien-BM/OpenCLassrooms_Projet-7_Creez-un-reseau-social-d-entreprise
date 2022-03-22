import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './user/userReducer';
import postReducer from './posts/postReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  userReducer,
  postReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
