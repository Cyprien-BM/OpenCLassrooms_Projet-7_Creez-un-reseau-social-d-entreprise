import axios from 'axios';

const INITIAL_STATE = {
  posts: [],
  status: '',
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
    case 'CREATE-POST': {
      return {
        ...state,
        status: action.payload,
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

export const getAllPostsFunction = () => (dispatch) => {
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

export const createAPostFunction = (post) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/post/create`,
      {
        title: post.title,
        content: post.content,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response);
      dispatch({
        type: 'CREATE-POST',
        payload: response.data.message,
      });
    });
};

export const getOnePostFucntion = (id) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}api/post/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
    });
};
