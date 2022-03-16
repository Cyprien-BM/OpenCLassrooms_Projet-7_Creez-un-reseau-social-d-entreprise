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
Ajout d'un système de cookie -> modification du back et du front en consequence pour generer le cookie lors du loggin et récuperer ces données lors des différentes requêtes // Début de création de la page register// Ajout d'un paragraphe sur la page loggin pour la réception et l'affichage d'erreur lors du contatc API // Passage sur axios pour le contact d'API