import axios from 'axios';

const INITIAL_STATE = {
  status: '',
  userData: {},
  userLike: [],
  otherUserData: {},
  error: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'REGISTER': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'GET-USER': {
      if (action.payload.otherUser === true) {
        return {
          ...state,
          otherUserData: action.payload.user,
          error: '',
        };
      } else {
        return {
          ...state,
          userData: action.payload,
          error: '',
        };
      }
    }
    case 'GET-USER-LIKE': {
      return {
        ...state,
        userLike: action.payload
      }
    }
    case 'USER-MODIFICATION': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'PASSWORD-MODIFICATION': {
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        userData: {},
        status: action.payload,
        error: '',
      };
    }
    case 'USER-DELETE': {
      return {
        ...state,
        status: action.payload,
        userData: {},
        otherUserData: {},
        error: '',
      };
    }
    case 'USER-ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'RESET-STATE': {
      return {
        ...state,
        status: action.payload,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default userReducer;

export const loginFunction = (user) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/auth/login`,
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    )
    .then((response) => {
      dispatch({
        type: 'LOGIN',
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'USER-ERROR',
        payload: error.response.data.error,
      });
    });
};

export const logoutFunction = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}api/auth/cookie-delete`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'LOGOUT',
        payload: response.data,
      });
    });
};

export const registerFunction = (user) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}api/auth/signup`, {
      email: user.email,
      password: user.password,
      nickname: user.nickname,
    })
    .then((response) => {
      dispatch({
        type: 'REGISTER',
        payload: response.data,
      });
    })
    .catch((e) => {
      const error = e.response.data.error;
      if (error.errors) {
        dispatch({
          type: 'USER-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'USER-ERROR',
          payload: error,
        });
      }
    });
};

export const getUserFunction = () => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}api/profile/user`, {
      withCredentials: true,
    })
    .then((response) => {
      if (Object.keys(response.data).length === 0) {
        dispatch({
          type: 'USER-ERROR',
          payload: 'empty user',
        });
      } else {
        dispatch({
          type: 'GET-USER',
          payload: response.data,
        });
      }
    })
    .catch((e) => {
      const error = e.response.data;
      if (error.message) {
        dispatch({
          type: 'USER-ERROR',
          payload: error.message,
        });
      } else {
        dispatch({
          type: 'USER-ERROR',
          payload: error,
        });
      }
    });
};

export const getUserFunctionById = (id) => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}api/profile/user/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      if (Object.keys(response.data).length === 0) {
        dispatch({
          type: 'USER-ERROR',
          payload: 'empty user',
        });
      } else {
        dispatch({
          type: 'GET-USER',
          payload: response.data,
        });
      }
    })
    .catch((e) => {
      const error = e.response.data;
      if (error.message) {
        dispatch({
          type: 'USER-ERROR',
          payload: error.message,
        });
      } else {
        dispatch({
          type: 'USER-ERROR',
          payload: error,
        });
      }
    });
};

export const changeUserDataFunction = (user, file, id) => (dispatch) => {
  const data = new FormData();
  data.append('email', user.email);
  data.append('nickname', user.nickname);
  data.append('firstname', user.firstname);
  data.append('lastname', user.lastname);
  data.append('image', file);

  axios
    .put(`${process.env.REACT_APP_API_URL}api/profile/modify/${id}`, data, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'USER-MODIFICATION',
        payload: response.data.message,
      });
    })
    .catch((error) => {});
};

export const resetStateFunction = () => (dispatch) => {
  dispatch({
    type: 'RESET-STATE',
    payload: '',
  });
};

export const changePasswordFunction = (password, id) => (dispatch) => {
  axios
    .put(`${process.env.REACT_APP_API_URL}api/profile/password/${id}`, password, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'PASSWORD-MODIFICATION',
        payload: response.data.message,
      });
    })
    .catch((e) => {
      const error = e.response.data.error;
      if (error.errors) {
        dispatch({
          type: 'USER-ERROR',
          payload: error.errors[0].message,
        });
      } else {
        dispatch({
          type: 'USER-ERROR',
          payload: error,
        });
      }
    });
};

export const deleteUserFunction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/profile/delete/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'USER-DELETE',
        payload: response.data.message,
      });
    });
};

export const getUserLike = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}api/profile/like`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: 'GET-USER-LIKE',
        payload: response.data
      })
    });
};

export const deleteUserImageFunction = (id) => (dispatch) => {
  axios
  .delete(`${process.env.REACT_APP_API_URL}api/profile/delete/image/${id}`, {
    withCredentials: true,
  })
  .then((response) => {
    dispatch({
      type: 'USER-DELETE',
      payload: response.data.message,
    });
  });
}

