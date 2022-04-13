import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './user/userReducer';
import postReducer from './posts/postReducer';
import commentsReducer from './comments/commentsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  commentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
