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
      const newCommentsArray = [...state.comments];
      newCommentsArray.push(action.payload);
      return {
        ...state,
        status: 'Commentaire Créé',
        comments: newCommentsArray,
        error: '',
      };
    }
    case 'DELETE-A-COMMENT': {
      const newCommentsArray = [...state.comments];
      const commentIndex = newCommentsArray.findIndex(
        (comment) => comment.commentId === action.payload.commentId
      );
      newCommentsArray.splice(commentIndex, 1)
      return {
        ...state,
        comments: newCommentsArray,
        status: 'Commentaire supprimé',
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
      const newCommentsArray = [...state.comments];
      const commentIndex = newCommentsArray.findIndex(
        (comment) => comment.commentId === action.payload.commentId
      );
      const newComment = {
        ...newCommentsArray[commentIndex],
        ...action.payload,
      };
      newCommentsArray[commentIndex] = newComment;
      return {
        ...state,
        comments: newCommentsArray,
        status: 'Commentaire modifié',
        error: '',
      };
    }
    case 'MODIFY-COMMENT-USER-DATA': {
      const modifiedUser = {
        nickname: action.payload.nickname,
        idUSER: action.payload.idUSER,
        pictureUrl: action.payload.pictureUrl,
      };
      const newCommentsArray = [...state.comments];
      const modifiedArray = newCommentsArray.map((comment) => {
        if (comment.user.idUSER === action.payload.idUSER) {
          comment.user = modifiedUser;
          return comment;
        }
        return comment;
      });
      return {
        ...state,
        comments: modifiedArray,
        status: '',
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
        payload: response.data,
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
        payload: parseInt(id),
      });
    })
    .catch((error) => {
      dispatch({
        type: 'COMMENT-ERROR',
        payload: error,
      });
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
        payload: response.data,
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

export const deleteCommentImageFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/comment/image/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'MODIFY-A-COMMENT',
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
            type: 'COMMENT-ERROR',
            payload:
              "Impossible de supprimer l'image sans ajouter de texte au préalable",
          });
        }
      } else {
        dispatch({
          type: 'COMMENT-ERROR',
          payload: error,
        });
      }
    });
};

export const ModifyUserDataOnComments = (userData) => (dispatch) => {
  dispatch({
    type: 'MODIFY-COMMENT-USER-DATA',
    payload: userData,
  });
}
