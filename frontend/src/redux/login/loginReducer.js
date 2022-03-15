const INITIAL_STATE = {
  userData: []
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN': {
      const newArr = action.payload
      return {
        ...state,
        userData: newArr,
      };
    }
    default: 
      return {state}
  }
}

export default loginReducer;

export const loginFunction = (user) => (dispatch) => {
  user = JSON.stringify(user);
  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: user,
  })
    .then((response) => response.json())
    .then((userData) => {
      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
    });
};
