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
        error: '',
      };
    }
    case 'CREATE-POST': {
      const newPostsArray = [...state.posts];
      newPostsArray.unshift(action.payload);
      return {
        ...state,
        posts: newPostsArray,
        status: 'Post créé',
        error: '',
      };
    }
    case 'POST-MODIFICATION': {
      const newPostsArray = [...state.posts];
      const postIndex = newPostsArray.findIndex(
        (post) => post.idPOSTS === action.payload.idPOSTS
      );
      const newPost = { ...newPostsArray[postIndex], ...action.payload };
      newPostsArray[postIndex] = newPost;
      return {
        ...state,
        posts: newPostsArray,
        post: newPost,
        error: '',
      };
    }
    case 'POST-DELETE': {
      const newPostsArray = [...state.posts];
      const postIndex = newPostsArray.findIndex(
        (post) => post.idPOSTS === action.payload
      );
      newPostsArray.splice(postIndex, 1)
      return {
        ...state,
        post: {},
        posts: newPostsArray,
        status: 'Post supprimé',
        error: '',
      };
    }
    case 'POST-LIKE': {
      const newPostsArray = [...state.posts];
      const postIndex = newPostsArray.findIndex(
        (post) => post.idPOSTS === action.payload.idPOSTS
      );
      const newPost = { ...newPostsArray[postIndex], ...action.payload };
      newPostsArray[postIndex].likes = action.payload.likes;
      return {
        ...state,
        posts: newPostsArray,
        post: newPost,
        status: 'like effectué',
        error: '',
      };
    }
    case 'POST-CLEAN-STATUS': {
      return {
        ...state,
        status: '',
      };
    }
    case 'POST-ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'CLEAN-ERROR': {
      return {
        ...state,
        error: '',
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

export const createAPostFunction = (post, file) => (dispatch) => {
  const data = new FormData();
  if (!post.title) {
    data.append('title', null);
  } else {
    data.append('title', post.title);
  }
  data.append('content', post.content);
  data.append('image', file);

  axios
    .post(`${process.env.REACT_APP_API_URL}api/post/create`, data, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'CREATE-POST',
        payload: response.data,
      });
    })
    .catch((e) => {
      const error = e.response.data.error;
      if (error.errors) {
        dispatch({
          type: 'POST-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'POST-ERROR',
          payload: error,
        });
      }
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
  axios
    .put(`${process.env.REACT_APP_API_URL}api/post/${id}`, data, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'POST-MODIFICATION',
        payload: response.data,
      });
    })
    .catch((e) => {
      const error = e.response.data;
      if (error.errors) {
        dispatch({
          type: 'POST-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'POST-ERROR',
          payload: error,
        });
      }
    });
};

export const deletePostFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/post/${id}`, {
      withCredentials: true,
    })
    .then(() => {
      dispatch({
        type: 'POST-DELETE',
        payload: parseInt(id),
      });
    })
    .catch((e) => {
      const error = e.response.data;
      if (error.errors) {
        dispatch({
          type: 'POST-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'POST-ERROR',
          payload: error,
        });
      }
    });
};

export const likeFunction = (likeValue, id) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/post/like/${id}`,
      { likeValue },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch({
        type: 'POST-LIKE',
        payload: response.data,
      });
    });
};

export const deletePostImageFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/post/image/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'POST-MODIFICATION',
        payload: response.data,
      });
    })
    .catch((e) => {
      const error = e.response.data;
      if (error.errors) {
        if (
          error.errors[0].message ===
          'Veuillez ajouter un texte ou ajouter une image'
        ) {
          dispatch({
            type: 'POST-ERROR',
            payload:
              "Impossible de supprimer l'image sans ajouter de texte au préalable",
          });
        }
      } else {
        dispatch({
          type: 'POST-ERROR',
          payload: error,
        });
      }
    });
};
