import axios from 'axios';

const INITIAL_STATE = {
  posts: [],
  error: '',
};

function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET-ALL-POST': {
      return {
        ...state,
        posts: action.payload,
        error: '',
      };
    }
    case 'POST-ERROR': {
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

export default postReducer;

export const getAllPosts = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}api/post/all`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'GET-ALL-POST',
        payload: response.data,
      });
    })
    .catch((e) => {
      const error = e.response.data;
      if (error.message) {
        dispatch({
          type: 'POST-ERROR',
          payload: error.message,
        });
      } else {
        dispatch({
          type: 'POST-ERROR',
          payload: error,
        });
      }
    });
};
