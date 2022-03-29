import axios from 'axios';

const INITIAL_STATE = {
  posts: [],
  post: {},
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
    case 'GET-ONE-POST': {
      return {
        ...state,
        post: action.payload,
      };
    }
    case 'CREATE-POST': {
      return {
        ...state,
        status: action.payload,
      };
    }
    case 'POST-MODIFICATION': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'POST-DELETE': {
      return {
        ...state,
        post: {},
        status: action.payload,
        error: '',
      };
    }
    case 'CLEAN-STATUS': {
      return {
        ...state,
        status: '',
      };
    }
    case 'POST-ERROR': {
      return {
        ...state,
        posts: [],
        status: '',
        error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default postReducer;

export const getAllPostsFunction = () => (dispatch) => {
  console.log('trigger');
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

export const createAPostFunction = (post, file) => (dispatch) => {
  const data = new FormData();
  data.append('title', post.title);
  data.append('content', post.content);
  data.append('image', file);

  axios
    .post(`${process.env.REACT_APP_API_URL}api/post/create`, data, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'CREATE-POST',
        payload: response.data.message,
      });
      getAllPostsFunction()
      // dispatch({
      //   type: 'GET-ALL-POST',
      //   payload: response.data,
      // });
    });
};

export const getOnePostFunction = (id) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}api/post/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'GET-ONE-POST',
        payload: response.data,
      });
    });
};

export const postModificationFunction = (post, file, id) => (dispatch) => {
  const data = new FormData();
  data.append('title', post.title);
  data.append('content', post.content);
  data.append('image', file);
  for (let i of data) {
    console.log(i);
  }
  axios
    .put(`${process.env.REACT_APP_API_URL}api/post/${id}`, data, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'POST-MODIFICATION',
        payload: response.data.message,
      });
    })
    .catch((error) => {});
};

export const deletePostFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/post/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'POST-DELETE',
        payload: response.data.message,
      });
    });
};
