const INITIAL_STATE = {};

function registerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        state: action.payload,
      };
    }
    default: 
      return {state}
  }
}

export default registerReducer;

export const registerFunction = (user) => (dispatch) => {
  user = JSON.stringify(user);
  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: user,
  })
    .then(response => response.json())
    .then(userData => {
      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
    })
    .catch(error => {
      dispatch ({
        type: 'ERROR',
        payload: error
      })
    })
};
