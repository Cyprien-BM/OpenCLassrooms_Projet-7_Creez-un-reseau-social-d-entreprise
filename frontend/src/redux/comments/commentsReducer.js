import axios from 'axios';

const INITIAL_STATE = {
  comments: [],
  status: '',
  error: '',
};

function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET-ALL-COMMENTS': {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case 'POST-A-COMMENT': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'DELETE-A-COMMENT': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'CLEAN-COMMENT-STATUS': {
      return {
        ...state,
        status: '',
      };
    }
    case 'MODIFY-A-COMMENT': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'COMMENT-ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'COMMENT-CLEAN-ERROR': {
      return {
        ...state,
        error: '',
      };
    }
    default:
      return state;
  }
}

export default commentsReducer;

export const getAllComments = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}api/comment/`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'GET-ALL-COMMENTS',
        payload: response.data,
      });
    });
};

export const postAComment = (comment, file, postId) => (dispatch) => {
  const data = new FormData();
  data.append('content', comment.content);
  data.append('image', file);

  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/comment/create/${postId}`,
      data,
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch({
        type: 'POST-A-COMMENT',
        payload: response.data.message,
      });
    })
    .catch((e) => {
      const error = e.response.data.error;
      if (error.errors) {
        dispatch({
          type: 'COMMENT-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'COMMENT-ERROR',
          payload: error,
        });
      }
    });
};

export const deleteCommentFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/comment/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'DELETE-A-COMMENT',
        payload: response.data.message,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

export const modifyAComment = (comment, file) => (dispatch) => {
  const data = new FormData();
  data.append('content', comment.content);
  data.append('image', file);

  axios
    .put(
      `${process.env.REACT_APP_API_URL}api/comment/${comment.commentId}`,
      data,
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch({
        type: 'MODIFY-A-COMMENT',
        payload: response.data.message,
      });
    })
    .catch((e) => {
      const error = e.response.data.error;
      console.log(e.response.data);
      if (error.errors) {
        dispatch({
          type: 'COMMENT-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'COMMENT-ERROR',
          payload: error,
        });
      }
    });
};

export const deleteCommentImageFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/comment/image/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'DELETE-A-COMMENT',
        payload: response.data.message,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};
