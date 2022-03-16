import axios from 'axios';

const INITIAL_STATE = {};

function loginReducer(state = INITIAL_STATE, action) {
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

export default loginReducer;

export const loginFunction = (user) => (dispatch) => {
  // user = JSON.stringify(user);
  console.log(user);
  axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
    email: user.email,
    password: user.password
  }, { withCredentials: true })
    .then(response => {
      console.log(response)
    });
};
