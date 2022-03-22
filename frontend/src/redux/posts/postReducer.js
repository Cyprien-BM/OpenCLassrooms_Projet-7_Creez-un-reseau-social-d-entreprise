import axios from 'axios';

const INITIAL_STATE = {
  posts:[],
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
    .then(response => {
      dispatch({
        type: 'GET-ALL-POST',
        payload: response.data,
      });
    })
};
